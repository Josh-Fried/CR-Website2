// File 2: api/GetConfig/index.js
// This function reads the base URL from the environment settings.

module.exports = async function (context, req) {
  // Read the 'VIDEO_BASE_URL' from the settings.
  // It will be "" locally, and your Azure URL when deployed.
  const baseUrl = process.env.VIDEO_BASE_URL || "";

  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: { 
        baseUrl: baseUrl 
    }
  };
}