const express = require("express");
const cors = require("cors");
require("dotenv").config();

const snippetRoutes = require("./routes/snippetRoutes");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "code-snippet-manager-39bf-git-main-tathagat-guptas-projects.vercel.app",
    "https://code-snippet-manager-39bf.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
app.use(rateLimiter);
app.use("/api/snippets", snippetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));