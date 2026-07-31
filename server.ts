import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import * as _pdfParse from "pdf-parse";
const pdfParse = (_pdfParse as any).default || _pdfParse;
import mammoth from "mammoth";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Supabase client if credentials exist
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/resume/analyze", upload.single("resume"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Supabase Storage if configured
      if (supabase) {
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        
        if (uploadError) {
          console.error("Error uploading to Supabase:", uploadError);
          // Optional: handle error if you want to abort the request
          // return res.status(500).json({ error: "Failed to upload to storage" });
        } else {
          console.log("Successfully uploaded resume to Supabase:", fileName);
        }
      }

      let text = "";
      if (file.mimetype === "application/pdf") {
        const data = await pdfParse(file.buffer);
        text = data.text;
      } else if (
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype === "application/msword" || file.originalname.endsWith('.doc') || file.originalname.endsWith('.docx')
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value;
      } else if (file.mimetype === "text/plain") {
        text = file.buffer.toString("utf-8");
      } else {
        // Fallback for unknown types but still text based
        text = file.buffer.toString("utf-8");
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Mock response
        setTimeout(() => {
          res.json({
            atsScore: 78,
            technicalSkills: [
              { name: "React", proficiency: "Advanced" },
              { name: "TypeScript", proficiency: "Intermediate" },
              { name: "Node.js", proficiency: "Intermediate" }
            ],
            softSkills: ["Communication", "Teamwork", "Problem Solving"],
            missingKeywords: ["Docker", "AWS", "CI/CD"],
            improvementSuggestions: [
              "Add more quantifiable achievements.",
              "Include a link to your GitHub portfolio.",
              "Tailor your summary to a specific role."
            ]
          });
        }, 1500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Analyze this resume and provide a strict JSON response. Do not include markdown code blocks like \`\`\`json. The response should be raw JSON that matches this schema:
        {
           "atsScore": number (0-100),
           "technicalSkills": [{ "name": string, "proficiency": string ("Beginner", "Intermediate", "Advanced") }],
           "softSkills": [string],
           "missingKeywords": [string],
           "improvementSuggestions": [string]
        }
        
        Resume Text:
        ${text.substring(0, 30000)}`, // Limit text to avoid huge payloads just in case
        config: {
          responseMimeType: "application/json",
        },
      });

      let jsonResult;
      try {
        jsonResult = JSON.parse(response.text || "{}");
      } catch (e) {
        jsonResult = { error: "Failed to parse AI response" };
      }

      res.json(jsonResult);
    } catch (error: any) {
      console.error("Error in resume analysis API:", error?.message || error);
      res.status(500).json({ error: "Failed to analyze resume", details: error?.message });
    }
  });

  // API routes FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Mock response
        setTimeout(() => {
          res.json({
            response: `This is a mock response from the AI Mentor. I received your message: "${message}". Please configure the GEMINI_API_KEY environment variable to enable real responses.`,
          });
        }, 1000);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const formattedHistory = history?.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })) || [];

      const recentHistory = formattedHistory.slice(-10);

      // Append system instruction as the first message or configure it in the client
      const chat = ai.chats.create({
        model: 'gemini-3.6-flash',
        config: {
          systemInstruction: "You are an AI Mentor for engineering and computer science students. You help with interview preparation, learning programming concepts, and career advice."
        },
        history: recentHistory,
      });

      const response = await chat.sendMessage({ message });

      res.json({
        response: response.text,
      });
    } catch (error: any) {
      console.error("Error in chat API:", error?.message || error);
      fs.writeFileSync('/tmp/chat-error.log', String(error?.stack || error));
      res.status(500).json({ error: "Failed to generate response", details: error?.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
