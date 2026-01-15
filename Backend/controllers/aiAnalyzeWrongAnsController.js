import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiAnalyzeWrongAnswers = async (req, res) => {
  try {
    const { wrongAnsArr } = req.body;

    if (!wrongAnsArr || wrongAnsArr.length === 0) {
      return res.status(400).json({ message: "No wrong answers" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log(genAI);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const tech = wrongAnsArr[0]?.tech || "General Technology";

    const prompt = `
      You are an expert ${tech} tutor. A student has failed some questions in a quiz.
      
      STUDENT MISTAKES DATA (JSON):
      ${JSON.stringify(wrongAnsArr, null, 2)} 

      INSTRUCTIONS:
      1. For each question in the data, provide a very brief explanation of why the user's answer was incorrect.
      2. Provide a two-sentence 'Pro-Tip' to master the correct concept.
      3. Use a professional, encouraging, and mentor-like tone.
      4. Format the output using clear bullet points and bold headings for each question.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ 
      success: true, 
      summary: text
    });

  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: "AI Service Error", 
      error: error.message 
    });
  }
};