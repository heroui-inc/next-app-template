import os from "os";

export default function handler(req, res) {
  res.status(200).json({
    hostname: process.env.HOSTNAME || os.hostname(),
    time: new Date().toISOString(),
  });
}

