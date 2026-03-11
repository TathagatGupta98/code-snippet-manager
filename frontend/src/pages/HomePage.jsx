import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import SnippetCard from "../components/SnippetCard";
import SnippetsNotFound from "../components/SnippetsNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await api.get("/snippets");
        console.log(res.data);
        setSnippets(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching snippets");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load snippets");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading snippets...</div>}

        {snippets.length === 0 && !isRateLimited && <SnippetsNotFound />}

        {snippets.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} setSnippets={setSnippets} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;