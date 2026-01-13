import { useEffect, useState } from "react";
import axios from "axios";
import { Award, Target, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const API_BASE = "http://localhost:4000";

const Profile = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);


  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    const fetchResults = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/api/results`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.success) {
          setResults(res.data.results);
          console.log(results)
        }
      } 
      catch (err) {
        console.error("Failed to fetch results:", err.response?.data || err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token]);



  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading results...
      </div>
    );
  }


  if (!results.length) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <Award size={48} className="mx-auto text-purple-600 mb-3" />
          <h2 className="text-xl font-semibold">No quiz results yet</h2>
          <p className="text-gray-500 mt-1">
            Take a quiz to see your performance here.
          </p>
          <h4 onClick={() => {navigate('/')}} className="text-purple-600 cursor-pointer my-2">Home</h4>
        </div>
      </div>
    );
  }

  return (<>
    

    <Navbar />

    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Quiz Results
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((r) => (
          <div
            key={r._id}
            className="border rounded-lg p-4 bg-purple-50 shadow-sm"
          >
            <h3 className="font-semibold text-lg capitalize mb-1">
              {r.technology} – {r.level}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              {new Date(r.createdAt).toLocaleString()}
            </p>

            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle size={18} />
                {r.correct}
              </span>

              <span className="flex items-center gap-1 text-red-600">
                <XCircle size={18} />
                {r.wrong}
              </span>

              <span className="flex items-center gap-1 text-purple-700">
                <Target size={18} />
                {r.score}%
              </span>
            </div>

            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                  ${
                    r.performance === "Excellent"
                      ? "bg-green-200 text-green-800"
                      : r.performance === "Good"
                      ? "bg-blue-200 text-blue-800"
                      : r.performance === "Average"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {r.performance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  );
};

export default Profile;
