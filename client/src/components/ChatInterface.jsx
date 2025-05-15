import { useState } from "react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [senderPronoun, setSenderPronoun] = useState("they");
  const [targetPronoun, setTargetPronoun] = useState("they");
  const [reply, setReply] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    const contextMessage = `Enter the message you (${senderPronoun}) received from the person (${targetPronoun}) you're trying to RIZZ:\n\n${message}`;

    if (file) {
      formData.append("file", file);
    } else {
      formData.append("message", contextMessage);
    }

    formData.append("sender", senderPronoun);
    formData.append("target", targetPronoun);

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
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-xl p-6 rounded-2xl border border-pink-200">
      <h1 className="text-3xl font-bold mb-4 text-center text-rose-600">
        Rizz Chat Bot 💘
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-rose-800 mb-1">
          Your pronoun
        </label>
        <select
          value={senderPronoun}
          onChange={(e) => setSenderPronoun(e.target.value)}
          className="w-full p-2 rounded border border-rose-300"
        >
          <option value="he">he</option>
          <option value="she">she</option>
          <option value="they">they</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-rose-800 mb-1">
          Their pronoun
        </label>
        <select
          value={targetPronoun}
          onChange={(e) => setTargetPronoun(e.target.value)}
          className="w-full p-2 rounded border border-rose-300"
        >
          <option value="he">he</option>
          <option value="she">she</option>
          <option value="they">they</option>
        </select>
      </div>

      <textarea
        className="w-full border border-rose-300 rounded-md p-3 mb-4"
        rows={4}
        placeholder={`Enter the message you (${senderPronoun}) received from the person (${targetPronoun}) you're aiming to RIZZZZZZ`}
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
        className="w-full bg-rose-500 text-white py-2 px-4 rounded-xl hover:bg-rose-600 transition-all"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Summoning the rizz..." : "Generate Rizz 💘"}
      </button>

      {reply && (
        <div className="mt-6 bg-rose-50 p-4 rounded-xl border border-rose-200">
          <h2 className="text-lg font-semibold text-rose-700 mb-2">
            💌 Rizz Reply:
          </h2>
          <p className="mb-2">{reply}</p>
          <h3 className="text-sm font-medium text-rose-600">Why it works:</h3>
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
