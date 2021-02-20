const mongoose = require('mongoose');    //Import the mongoose module

const Schema = mongoose.Schema; //Define a schema

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new Schema(
{

    username: 
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;