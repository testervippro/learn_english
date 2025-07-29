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

    if (words.length === 0) {
      return res.status(404).json({ error: "No words found in the file." });
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json({ word: randomWord });
  });
});

// ✅ IMPORTANT: Bind to 0.0.0.0 so Render can access it
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running and listening on port ${PORT}`);
});
