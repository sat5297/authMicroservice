const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    empID : {
        type : String,
        required : true
    }
})