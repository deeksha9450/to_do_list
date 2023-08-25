const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

const ToDoList=mongoose.model('ToDoList',listSchema);
module.exports=ToDoList;