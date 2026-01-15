import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, ArrowLeft, Brain, BookMarked } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: "", content: "", tech: "" });

    const navigate = useNavigate();
    const API_BASE = "http://localhost:4000";

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const res = await axios.get(`${API_BASE}/api/notes`, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            setNotes(res.data.notes);
        } catch (err) {
            console.error("Error in fetching notes", err);
        } finally {
            setLoading(false);
        }
    };

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const res = await axios.post(`${API_BASE}/api/notes`,
                { ...form, isAI: false },
                { headers: { Authorization: `Bearer ${auth?.token}` } }
            );
            setNotes([res.data.note, ...notes]);
            setShowModal(false);
            setForm({ title: "", content: "", tech: "" });
        } catch (err) {
            console.error("Server Error:", err.response?.data);
            alert("Error saving note: " + (err.response?.data?.message || "Internal Server Error"));
        }
    };

    const deleteNote = async (id) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            await axios.delete(`${API_BASE}/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            setNotes(notes.filter(n => n._id !== id));
        } catch (err) {
            alert("Error deleting", err);
        }
    }

    return (
       <>

            <div className="mx-auto p-3 md:px-10 flex justify-between items-center nav-bg w-full">
                <div className="flex items-center gap-1 md:gap-4">
                    <button onClick={() => navigate(-1)} className="text-slate-800 hover:text-slate-900">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white">Personal Notes</h1>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn text-sm md:text-[16px]"
                >
                    Add Note
                </button>
            </div>

            <div className="min-h-screen bg-gray-100 text-slate-900 font-sans p-4">

            <main className="max-w-6xl mx-auto px-6 pb-20">
                {loading ? (
                    <p className="text-slate-400">Loading notes...</p>
                ) : notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-[30vh]">
                        <BookMarked size={32} className="text-slate-300" />
                        <h3 className="text-lg font-bold text-purple-700">No notes found</h3>
                        <p className="text-gray-400 text-sm mt-1 max-w-xs text-center">
                            Take a quiz and save learning or create a manual note to get started.
                        </p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="break-inside-avoid bg-white border border-purple-200 rounded-sm p-4 hover:border-slate-300 transition-all relative group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {note.isAI && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                                                <Brain size={10} /> AI Summary
                                            </span>
                                        )}
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                                            {note.tech || "General"}
                                        </span>
                                    </div>
                                    <button onClick={() => deleteNote(note._id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 className="font-bold text-lg mb-2 leading-tight">{note.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                    {note.content}
                                </p>

                                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-[11px] text-slate-400 font-medium">
                                    <span>{new Date(note.createdAt).toDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>


            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-purple-700">New Note</h2>
                            <button onClick={() => setShowModal(false)} className="text-purple-400 hover:text-purple-800">Close</button>
                        </div>

                        <form onSubmit={saveNote} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Topic</label>
                                <input
                                    required
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 transition-all"
                                    placeholder="e.g. Understanding Event Loop"
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Category</label>
                                <input
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 transition-all"
                                    placeholder="e.g. JavaScript"
                                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Your Note</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-900 transition-all resize-none"
                                    placeholder="Write your explanation..."
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn"
                            >
                                Save Note
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>

        </>
    );
};

export default Notes;