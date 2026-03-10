const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");
const validateSnippet = require("../middleware/validateSnippet");


router.get("/", snippetController.getAllSnippets);
router.get("/:id", snippetController.getSnippetById);
router.post("/", validateSnippet, snippetController.createSnippet);
router.put("/:id", validateSnippet, snippetController.updateSnippet);
router.delete("/:id", snippetController.deleteSnippet);

module.exports = router;