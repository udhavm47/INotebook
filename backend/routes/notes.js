/** this script is used to display notes of a particular user  */
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import express from 'express';
import fetchuser from '../middleware/fetchuser.js';

const notesRouter = express.Router();
const app = express();
app.use(express.json());

/** Logic:
 * first we will ensure that user is logged in and has a valid token using fetchuser middleware
 *  notes.find will find the document which contains the given paramenter  here it is userId
 * then we will return all the documents of that user
 */

notesRouter.get('/allnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }

})

/**logic: (you need to be logged in for this we have passed a middleware function fetchuser)
 * here we are first validating the request that fields shoul not be empty
 * getting different values from request {title,description,tag}
 * creating a new note using obtained values of {title,description, tag}
 * saving that note
 */


notesRouter.post('/addnote', bodyParser.json(), [
    body('title', 'Enter a valid title format').isLength({ min: 8 }),
    body('description', 'description should be more than 10 charcters').isLength({ min: 10 })
], fetchuser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const result = validationResult(req);
        //console.log(result.formatter);
        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()[0]["msg"]});
        }
        const note = new Notes({title, description, tag, user: req.user.id})
        const savedNote = await note.save();
        res.json(savedNote)
    }catch (error) {
        console.log(error.message)
        return res.status(500).send('Internal Server Error');
    }

})




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ROUTE 3~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/** Logic: Login is compulsary
 * fiirst we will get the updated fields and content from the user.
 * make an updated note of it
 * make sure the note a user is updating is his/her's only
 * update the correct note
 */

notesRouter.put('/updatenote/:id', bodyParser.json(), fetchuser, async (req,res)=>{
    try {
         const {title, description, tag} = req.body;
         const id = req.id;

         // getting note id to modify the node.
     
         const noteId = req.params.id;
     
        
         const findNote = await Notes.findById(req.params.id); //finding if the note exists
         if(!findNote){
            return res.status(404).send('Not Found!');
         }
// Checking if the user,updating a nots belongs to him or note
         const checkNoteOwner = await Notes.findOne({ _id: noteId, userId: id });

         if (!checkNoteOwner) {
     
           return res.status(401).send("Not Allowed.");
     
         }
     
         const updatedNote = await Notes.findByIdAndUpdate(
     
           noteId,
     
           {
     
             title: title,
     
             description: description,
     
             tag: tag,
     
           },
     
           { new: true }
     
         );
     
         // new true brings new updated data from the mongo db not the old one in res.
     
         return res.send(updatedNote);
     
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error.");

    }
   

    


})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ROUTE 4~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**Logic:
 * we have just make sure that the note that is requested to delete, belongs to the user who is deleting and make sure that no other note is deletd
 */

notesRouter.delete('/deletenote/:id', bodyParser.json(), fetchuser, async (req,res)=>{
    try {
         const id = req.id;

         // getting note id to modify the node.
     
         const noteId = req.params.id;
     
        
         const findNote = await Notes.findById(req.params.id); //finding if the note exists
         if(!findNote){
            return res.status(404).send('Not Found!');
         }
// Checking if the user,updating a nots belongs to him or note
         const checkNoteOwner = await Notes.findOne({ _id: noteId, userId: id });

         if (!checkNoteOwner) {
     
           return res.status(401).send("Not Allowed.");
     
         }
     
         const deletedNote = await Notes.findByIdAndDelete(noteId)
          return res.status(302).json({success:"Note is deleted", note:deletedNote})
     
          
     
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error.");

    }
   

    


})




export default notesRouter;