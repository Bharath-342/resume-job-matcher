function analyzeSkills(resumeSkills, requiredSkills = [], optionalSkills = []) {

  const analysis = [];

  requiredSkills.forEach(skill => {

    analysis.push({
      skill,
      type: "required",
      presentInResume: resumeSkills.includes(skill)
    });

  });

  optionalSkills.forEach(skill => {

    analysis.push({
      skill,
      type: "optional",
      presentInResume: resumeSkills.includes(skill)
    });

  });

  return analysis;
}
function calculateMatchingScore(resumeSkills, requiredSkills = [], optionalSkills = []) {

  const totalSkills = requiredSkills.length + optionalSkills.length;

  const matched = [...requiredSkills, ...optionalSkills]
    .filter(skill => resumeSkills.includes(skill)).length;

  if (totalSkills === 0) return 0;

  return Math.round((matched / totalSkills) * 100);
}

function matchResumeWithJD(resumeData, jdData) {

  const requiredSkills = jdData.requiredSkills || [];
  const optionalSkills = jdData.optionalSkills || [];

  if (resumeData.experience < jdData.requiredExperience) {

    return {
      jobId: jdData.jobId,
      role: jdData.role,
      aboutRole: "Experience mismatch",
      message: `Required experience is ${jdData.requiredExperience} years and your experience is ${resumeData.experience} years. Therefore you are not suitable for this role and the application is rejected.`,
      skillsAnalysis: [],
      matchingScore: 0
    };
  }

  const skillsAnalysis = analyzeSkills(
    resumeData.skills,
    requiredSkills,
    optionalSkills
  );

  const matchingScore = calculateMatchingScore(
    resumeData.skills,
    requiredSkills,
    optionalSkills
  );

  return {
    jobId: jdData.jobId,
    role: jdData.role,
    requiredSkills,
    optionalSkills,
    skillsAnalysis,
    matchingScore
  };
}

module.exports = {
  matchResumeWithJD
};