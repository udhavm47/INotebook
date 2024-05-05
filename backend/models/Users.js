/** this script is used to create the template or structure of what a note will be look like */
import mongoose, {Schema} from 'mongoose';

//const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  }

},{timestamps:true});

const User = mongoose.model('user', UserSchema);
export default User;