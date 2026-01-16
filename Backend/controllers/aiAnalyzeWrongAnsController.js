import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiAnalyzeWrongAnswers = async (req, res) => {
  try {
    const { wrongAnsArr } = req.body;

    if (!wrongAnsArr || wrongAnsArr.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "API Key missing in .env" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const tech = wrongAnsArr[0]?.tech || "General Technology";
   
    const promptText = `
    You are a friendly and concise ${tech} tutor.  
    Analyze the quiz mistakes below and explain each wrong answer.

  Output format rules (must follow exactly):
  - Start each section with: * **Question X**
  - Leave one blank line after the question heading.
  - Write **exactly two short lines** under each question.
  - Each line explains one clear concept.
  - No bullets, no symbols, no numbering for the lines.
  - Do not include the user's answer.
  - Use plain, simple language.
  - No greetings or extra text.
  
  Quiz mistakes (JSON format):
  ${JSON.stringify(wrongAnsArr, null, 2)}
`;

   
    const result = await model.generateContent(promptText);
    const aiSummary = result.response.text();
    

    res.status(200).json({
      success: true,
      summary: aiSummary,
    });
  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
