const db = require("../config/firebase");

const snippetsCollection = db.collection("snippets");

const getAllSnippets  = async ({ language, search } = {}) => {
    let query = snippetsCollection;

    if (language) {
        query = query.where("language", "==", language);
    }

    const snapshot = await query.get();

    let snippets = snapshot.docs.map((doc) => ({
        id: doc.id,      
        ...doc.data(),   // Spread all fields: title, language, code, description, etc.
    }));

    if (search) {
        const keyword = search.toLowerCase();
        snippets = snippets.filter(
            (s) =>
                s.title.toLowerCase().includes(keyword) ||
                (s.description && s.description.toLowerCase().includes(keyword))
        );
    }

    return snippets;
};

const getSnippetById = async (id) => {
    const doc = await snippetsCollection.doc(id).get();

    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
};

const createSnippet = async ({ title, language, code, description }) => {
    const newSnippet = {
        title,
        language,
        code,
        description: description || "", 
        createdAt: new Date().toISOString(), 
    };

    const docRef = await snippetsCollection.add(newSnippet);

    return { id: docRef.id, ...newSnippet };
};

const updateSnippet = async (id, { title, language, code, description }) => {
    const docRef = snippetsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const updatedFields = {
        title,
        language,
        code,
        description: description || "",
        updatedAt: new Date().toISOString(),
    };

    await docRef.update(updatedFields);

    return { id, ...updatedFields };
};

const deleteSnippet = async (id) => {
    const docRef = snippetsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    await docRef.delete();

    return true;
};

module.exports = {
    getAllSnippets,
    getSnippetById,
    createSnippet,
    updateSnippet,
    deleteSnippet,
};