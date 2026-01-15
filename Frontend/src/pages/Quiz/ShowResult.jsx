import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Target , Sparkle } from "lucide-react";

const ShowResult = ({ correctCount, score, wrongCount , questions , userAnswers , tech  }) => {
    const navigate = useNavigate();

    const handleReviewClick = () =>{
        console.log('analyze wiht ai page ...')

        let filteredWrongAns = [];

        questions.forEach((q , index ) =>{
            const userSelected = userAnswers[index];
            const correctAns = q.correctAnswer;

            if(userSelected !== correctAns){
                filteredWrongAns.push({
                    question: q.question,
                    userAns : userSelected === -1 ? 'Not Answered': q.options[userSelected],
                    correctAns : q.options[correctAns],
                    tech: tech
                })
            }
        })
        navigate('/analyze/wrong-ans', { state:{wrong: filteredWrongAns}})
    }



    return (
        <div>
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 p-4">
                <div className="w-full md:w-[450px] p-8 bg-white border border-purple-100 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden">

                    <Target className="text-purple-600 mx-auto mb-4" size={50} />
                    <h2 className="text-3xl font-black text-gray-800 mb-6">Assessment Finished!</h2>

                    <div className="mb-8">
                        <p className="text-6xl font-black text-purple-600 mb-2">{score}%</p>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Correct</p>
                    </div>


                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                            <CheckCircle className="text-green-600 mx-auto mb-1" size={24} />
                            <p className="text-2xl font-bold text-green-700">{correctCount}</p>
                            <p className="text-xs font-bold text-green-600 uppercase">Correct</p>
                        </div>

                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                            <XCircle className="text-red-600 mx-auto mb-1" size={24} />
                            <p className="text-2xl font-bold text-red-700">{wrongCount}</p>
                            <p className="text-xs font-bold text-red-600 uppercase">Wrong</p>
                        </div>
                    </div>


                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleReviewClick}
                            className="w-full btn"
                        >
                            Analyze Wrong Ans with AI<Sparkle className='h-4' />
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full btn "
                        >
                            Back to Home
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className="w-full btn"
                        >
                            View Profile
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ShowResult
