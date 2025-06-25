// markdown-render-service/index.js

const express = require("express");
const marked = require("marked");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/render", (req, res) => {
  const markdown = req.body.markdown;
  if (typeof markdown !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid markdown field." });
  }
  try {
    const html = marked.parse(markdown);
    res.json({ html });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to render markdown.", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Markdown renderer running at http://localhost:${PORT}`);
});
