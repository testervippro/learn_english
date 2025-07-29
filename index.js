const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome! Visit <a href='/words'>/words</a> to get a random word.");
});

app.get("/words", (req, res) => {
  const filePath = path.join(__dirname, "words.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read words file." });
    }

    const words = data
      .split("\n")
      .map((w) => w.trim())
      .filter((w) => w);

    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json({ word: randomWord });
  });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
