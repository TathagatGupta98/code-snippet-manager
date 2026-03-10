const SnippetModel = require("../models/snippetModel");

const getAllSnippets = async (req, res) => {
    try {
        const { language, search } = req.query;

        const snippets = await SnippetModel.getAllSnippets({ language, search });

        res.status(200).json(snippets);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getSnippetById = async (req, res) => {
    try {
        const snippet = await SnippetModel.getSnippetById(req.params.id);

        if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
        }

        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSnippet = async (req, res) => {
    try {
        // req.body contains the JSON sent by the frontend 
        const snippet = await SnippetModel.createSnippet(req.body);

        // 201 = Created 
        res.status(201).json(snippet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSnippet = async (req, res) => {
    try {
        const snippet = await SnippetModel.updateSnippet(req.params.id, req.body);

        if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
        }

        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSnippet = async (req, res) => {
    try {
        const result = await SnippetModel.deleteSnippet(req.params.id);

        if (!result) {
        return res.status(404).json({ error: "Snippet not found" });
        }

        res.status(200).json({ message: "Snippet deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};