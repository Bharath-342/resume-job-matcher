const skillsList = require("../utils/skillList");

async function parseResume(text) {

  const name = extractName(text);
  const skills = extractSkills(text);
  const experience = extractExperience(text);
  const salary = extractSalary(text);

  return {
    name,
    skills,
    experience,
    salary
  };
}

function extractName(text) {

  const lines = text.split("\n");

  for (let line of lines) {

    line = line.trim();

    if (line.length > 2 && line.length < 40) {
      return line;
    }

  }

  return "Unknown";
}

function extractSkills(text) {

  const lowerText = text.toLowerCase();
  const foundSkills = new Set();

  // sort skills by length (longer first)
  const sortedSkills = [...skillsList].sort((a,b)=>b.length-a.length);

  sortedSkills.forEach(skill => {

    const skillLower = skill.toLowerCase();

    const escaped = skillLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escaped}\\b`, "i");

    if (regex.test(lowerText)) {

      // prevent adding partial duplicates
      let alreadyCovered = false;

      foundSkills.forEach(existing=>{
        if(existing.includes(skillLower)) alreadyCovered = true;
      });

      if(!alreadyCovered){
        foundSkills.add(skillLower);
      }

    }

  });

  return Array.from(foundSkills).map(s =>
    s.split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ")
  );
}


function extractExperience(text) {

  const regex = /(\d+)\+?\s*(years|yrs)/i;
  const match = text.match(regex);

  if (match) return parseInt(match[1]);

  return 0;

}

function extractSalary(text) {

  const regex = /salary\s*:\s*(\d+\s*lpa)/i;
  const match = text.match(regex);

  if (match) return match[1];

  return null;

}

module.exports = {
  parseResume
};