export const aiAnalyzeWrongAnswers = async (req, res) => {
  try {
    const { wrongAnsArr } = req.body;

    if (!wrongAnsArr || wrongAnsArr.length === 0) {
      return res.status(400).json({ success: false, message: "No data provided" });
    }


    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "API Key missing in .env" });
    }

    const tech = wrongAnsArr[0]?.tech || "General Technology";
    console.log("Processing AI request for tech:", tech);

    console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);


 const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

   
    const promptText = `You are a helpful ${tech} tutor. Analyze these quiz mistakes and give a concise summary: ${JSON.stringify(wrongAnsArr)}`;

  

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: promptText }]
        }]
      })
    });

    const data = await response.json()


    if (data.error) {
      console.error("Google API Error:", data.error.message);
      return res.status(data.error.code || 500).json({ 
        success: false, 
        message: data.error.message 
      });
    }


    const aiSummary = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({
      success: true,
      summary: aiSummary
    });

  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};