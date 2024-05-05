/** this script is used to create the template or structure of what a note will be look */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, // used to mark the user
    ref: 'user'
  },
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  tag : {
    type: String,
    default: "General"
  }

}, {timestamps:true});

const Notes = mongoose.model('Notes', NotesSchema);
export default Notes;