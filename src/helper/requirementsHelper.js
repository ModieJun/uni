/**
 * University list that are supported by the application
 */
const universities = [
    'Hong Kong University',
    'Polytechnic University of Hong Kong',
    'City University of Hong Kong',
    'Baptist Universtiy of Hong Kong'
];

/**
 * Requirements based on each othe universities  
 */
const requirements = [
    {
        university: "general",
        completionblocks: [
            {
                requirementName: "Personal Statement",
                requirementType: "docx/pdf",
                requirementItem: null,
            },
            {
                requirementName: "CV",
                requirementType: "docx/pdf",
                requirementItem: null,
            },
            {
                requirementName: "Reference Letter",
                requirementType: "docx/pdf",
                requirementItem: null,
            },
        ]
    },
];

/**
 * 
 * @param {string} universityName - the name of the university to get the requirements and completion blocks for
 * @returns {Array<Dictionary>} completion block components 
 */
function getRequirements(universityName) {
    const result = requirements.filter(ele => ele.university == universityName);
    return result.length !== 0 ? result[0].completionblocks : null;
}

export { universities, getRequirements }