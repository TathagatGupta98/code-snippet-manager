import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const LANGUAGES = [
  "javascript", "typescript", "python", "java", "c++",
  "c#", "go", "rust", "php", "ruby", "swift", "kotlin", "other"
];

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !code.trim()) {
      toast.error("Title and code are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/snippets", { title, language, code, description });
      toast.success("Snippet created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating snippet", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! Too many requests", { duration: 4000, icon: "💀" });
      } else {
        toast.error("Failed to create snippet");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Snippets
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Snippet</h2>
              <form onSubmit={handleSubmit}>

                <div className="form-control mb-4">
                  <label className="label"><span className="label-text">Title</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Fetch API wrapper"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label"><span className="label-text">Language</span></label>
                  <select
                    className="select select-bordered"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control mb-4">
                  <label className="label"><span className="label-text">Code</span></label>
                  <textarea
                    placeholder="Paste your code here..."
                    className="textarea textarea-bordered h-40 font-mono text-sm"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Description <span className="text-base-content/50">(optional)</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="What does this snippet do?"
                    className="input input-bordered"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Snippet"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;