const express = require("express");
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const router = express.Router();

const { parseResume } = require("../services/resumeParser");
const { parseJD } = require("../services/jdParser");
const { matchResumeWithJD } = require("../services/matcher");

router.post("/match", async (req, res) => {
  try {

    // Always read latest files
    const resumePath = path.join(__dirname, "../sample-data/resume.txt");
    const jdPath = path.join(__dirname, "../sample-data/jd.txt");

    const resumeText = fs.readFileSync(resumePath, "utf8");
    const jdText = fs.readFileSync(jdPath, "utf8");

    // Parse resume
    const resumeData = await parseResume(resumeText);

    // Parse job description
    const jdData = parseJD(jdText);

    // Run matching engine
    const result = matchResumeWithJD(resumeData, jdData);

    // Store result in PostgreSQL
    await pool.query(
      `INSERT INTO match_results
       (name, experience, salary, resume_skills, matching_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        resumeData.name || "Unknown",
        resumeData.experience || 0,
        resumeData.salary || "Not specified",
        (resumeData.skills || []).join(", "),
        result.matchingScore || 0
      ]
    );

    // Send response
    res.json({
      name: resumeData.name,
      salary: resumeData.salary,
      yearOfExperience: resumeData.experience,
      resumeSkills: resumeData.skills,
      matchingJobs: [result]
    });

  } catch (error) {

    console.error("MATCH API ERROR:", error);

    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });

  }
});

module.exports = router;