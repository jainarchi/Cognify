Cognif – Full-Stack MERN Learning Platform
Cognif is a comprehensive, gamified learning management system designed to assess and improve technical skills across 8+ modern technologies. Built with the MERN stack, it features a proctored environment, AI-driven feedback, and a logic-based rewards system.


🚀 Implemented Features
🔐 Security & Authentication
- JWT-Based Authentication: Secure user registration and login using JSON Web Tokens.
- Protected API Endpoints: Backend routes are shielded with custom middleware to ensure only authorized users can access or save results.
- Proctoring (Anti-Cheat): Integrated Window Switch Detection. The system monitors browser visibility and auto-submits the quiz if the user attempts to switch tabs or minimize the browser to search for answers.

🧠 Quiz Engine & Data
- Massive Question Bank: Over 1,240+ technical questions seeded in MongoDB across HTML, CSS, JavaScript, React, Node.js, MongoDB, Java, and OOPs.
- Dynamic Sampling: Uses MongoDB $aggregate and $sample pipelines to generate unique quiz instances every time.
- Adaptive Difficulty Timer: Level-specific countdowns (Basic: 6s, Intermediate: 10s, Advanced: 10s) to simulate high-pressure interview environments.

📊 User Experience & Analytics
- Interactive Dashboard: Modern UI for technology and difficulty selection.
- Real-time Feedback: Immediate Green/Red visual indicators with detailed technical explanations fetched from the database.
- Performance Profile: A dedicated dashboard showing quiz history, average scores, and performance badges (Excellent, Good, etc.).


🤖 Generative AI Integration
- Personalized AI Tutor: Integration with Google Gemini API to analyze a user's wrong answers and generate custom study notes and "Weak Area" summaries.


🛠️ Roadmap (Future Enhancements)
🏆 Gamification 2.0
- Streak System: Logic to track daily participation and award "Consistency Badges."
-Global Leaderboard: Real-time ranking of users based on total points and accuracy.





💻 Tech Stack
- Frontend: React.js, Tailwind CSS, Lucide Icons, Axios.
- Backend: Node.js, Express.js.
- Database: MongoDB Atlas.
- Security: JWT , Bcrypt.js 


Why this project is "Enterprise-Ready":

- Integrity: The Window Switch feature shows you value data validity.
- Scalability: The 1,200+ questions show the system can handle large data sets.
- Security: JWT protection shows you follow industry standards for user data.
