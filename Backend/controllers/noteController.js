import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  try {

    console.log( req.user , req.user.id)


      if( ! req.user || !req.user.id){
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            })
            
        }

    const { title, content, tech, isAI } = req.body;

    const savedNote = await Note.create({
      userId: req.user._id, 
      title,
      content,
      tech,
      isAI: isAI || false,
    });

    res.status(201).json({ success: true, note: savedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getMyNotes = async (req, res) => {
  try {
    console.log("getting...")
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    console.log("Error in getting notes" , err)
    res.status(500).json({ success: false, message: err.message });
  }
};




export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

   
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });


  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};