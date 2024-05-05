import mongoose from 'mongoose';
import Groups from '../../src/components/Groups';

const { Schema } = mongoose;

const GroupSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    members:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    notes:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Notes'
        }
    }]
},{timestamps:true});

const Group = mongoose.model('Group', GroupSchema);

export default Group;