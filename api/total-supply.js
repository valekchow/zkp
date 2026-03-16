export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send("1000000000");
}
