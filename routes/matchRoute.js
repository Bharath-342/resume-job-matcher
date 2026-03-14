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

    const resumePath = path.join(__dirname, "../sample-data/resume.txt");
    const jdPath = path.join(__dirname, "../sample-data/jd.txt");

    const resumeText = fs.readFileSync(resumePath, "utf8");
    const jdText = fs.readFileSync(jdPath, "utf8");

    const resumeData = await parseResume(resumeText);
    const jdData = parseJD(jdText);

    const result = matchResumeWithJD(resumeData, jdData);

    await pool.query(
      "INSERT INTO match_results(name, experience, salary, resume_skills, matching_score) VALUES($1,$2,$3,$4,$5)",
      [
        resumeData.name,
        resumeData.experience,
        resumeData.salary,
        resumeData.skills.join(", "),
        result.matchingScore
      ]
    );

    res.json({
      name: resumeData.name,
      salary: resumeData.salary,
      yearOfExperience: resumeData.experience,
      resumeSkills: resumeData.skills,
      matchingJobs: [result]
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;