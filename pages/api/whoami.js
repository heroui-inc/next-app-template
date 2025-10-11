export default function handler(req, res) {
  const os = require('os');
  res.status(200).json({
    hostname: process.env.HOSTNAME || os.hostname(),
    time: new Date().toISOString()
  });
}
