const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(__dirname + "/dist/spectra-frontend/browser"));

app.get("/status", function (req, res) {
  res.json({ status: "UP" });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/spectra-frontend/browser/index.html"));
});

app.listen(4200);
console.log(`SpectraFrontend running on: port ${4200}`);
