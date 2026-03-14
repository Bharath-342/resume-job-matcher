const skillsList = require("../utils/skillList");

function parseJD(text) {

  const requiredExperience = extractExperience(text);
  const skills = extractSkills(text);
  function extractRole(text) {

  const roles = [
    "backend developer",
    "frontend developer",
    "full stack developer",
    "java developer",
    "python developer",
    "devops engineer",
    "data engineer",
    "machine learning engineer",
    "cloud engineer",
    "software engineer"
  ];

  const lowerText = text.toLowerCase();

  for (let role of roles) {

    if (lowerText.includes(role)) {
      return role.split(" ").map(w =>
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(" ");
    }

  

  // fallback ONLY if nothing matched
  return "Software Engineer";
}

 
}
  return {
    jobId: "JD-" + Math.floor(Math.random() * 1000),
    role: "Software Engineer",
    requiredExperience,
    requiredSkills: skills,
    optionalSkills: []
  };

}

function extractSkills(text) {

  const lowerText = text.toLowerCase();
  const foundSkills = [];

  skillsList.forEach(skill => {

    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }

  });

  return foundSkills;

}

function extractExperience(text) {

  const regex = /(\d+)\+?\s*(years|yrs)/i;
  const match = text.match(regex);

  if (match) return parseInt(match[1]);

  return 0;

}

module.exports = {
  parseJD
};