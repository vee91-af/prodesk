import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

// Load API key from .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    skills: "",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate cover letter
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      alert("API key not found. Check .env file.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const prompt = `
Write a professional cover letter for ${formData.name}
applying for the ${formData.role} role at ${formData.company}.
Skills to highlight: ${formData.skills}.
Format the response into professional paragraphs.
`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      setOutput(text);
    } catch (error) {
      console.error(error);
      alert("Error generating cover letter. Check console.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Cover Letter Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <textarea
          name="skills"
          placeholder="Skills (React, Java, Python...)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {output && (
        <div className="output">
          <h2>Generated Cover Letter</h2>
          <p style={{ whiteSpace: "pre-line" }}>{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
