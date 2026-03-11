import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const SnippetCard = ({ snippet, setSnippets }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); 

    if (!window.confirm("Are you sure you want to delete this snippet?")) return;

    try {
      await api.delete(`/snippets/${id}`); 
      setSnippets((prev) => prev.filter((s) => s.id !== id)); 
      toast.success("Snippet deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete snippet");
    }
  };

  return (
    <Link
      to={`/snippet/${snippet.id}`} 
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary"
    >
      <div className="card-body">
        {/* Language badge */}
        <div className="flex items-center justify-between mb-1">
          <span className="badge badge-primary badge-outline text-xs">
            {snippet.language}
          </span>
        </div>

        <h3 className="card-title text-base-content">{snippet.title}</h3>

        {/* Show description or a preview of the code */}
        <p className="text-base-content/70 line-clamp-3 font-mono text-sm">
          {snippet.description || snippet.code}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(snippet.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, snippet.id)} // ← snippet.id
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SnippetCard;