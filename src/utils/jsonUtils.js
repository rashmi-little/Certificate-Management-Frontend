// utils/jsonUtils.js
export const safeJsonParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null; // Return null or a default value in case of error
  }
};
