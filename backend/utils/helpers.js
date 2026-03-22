function getStatus(accuracy) {
  if (accuracy === null || accuracy === undefined) return "Moderate"; 
  if (accuracy < 50) return "Weak";
  if (accuracy <= 75) return "Moderate";
  return "Strong";
}

function sendJSON(res, data) {
    res.json({ success: true, data });
}

function sendError(res, message, status = 400) {
    res.status(status).json({ success: false, message });
}
module.exports = { getStatus, sendJSON, sendError };
