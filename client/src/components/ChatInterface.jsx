import { useState } from "react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [reply, setReply] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("message", message);

    try {
      const res = await fetch("http://localhost:8000/rizzbot", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setReply(data.reply);
      setExplanation(data.explanation);
    } catch (err) {
      console.error("Failed to fetch rizz:", err);
      setReply("Oops... something went wrong.");
      setExplanation("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-lg p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Rizz Chat Bot 💬</h1>

      <textarea
        className="w-full border rounded-md p-2 mb-4"
        rows={4}
        placeholder="Paste a message or type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={file !== null}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setMessage("");
        }}
        className="mb-4"
      />

      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Generating..." : "Get the Rizz"}
      </button>

      {reply && (
        <div className="mt-6 bg-gray-50 p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">💡 Response:</h2>
          <p className="mb-2">{reply}</p>
          <h3 className="text-sm font-medium text-gray-600">Why it works:</h3>
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
