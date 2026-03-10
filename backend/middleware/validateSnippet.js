const validateSnippet = (req, res, next) => {
  const { title, language, code } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!language || !language.trim()) {
    return res.status(400).json({ error: "Language is required" });
  }

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "Code is required" });
  }

  // next() says "validation passed, move on to the controller"
  next();
};

module.exports = validateSnippet;