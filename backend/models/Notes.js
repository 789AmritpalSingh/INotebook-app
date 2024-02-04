const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //mongoose.Schema.Types.ObjectId is used to establish a relationship between notes and users. The ref property specifies that this field references the 'user' model.
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema)