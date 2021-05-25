const mongoose = require('mongoose');

//création schema sauce
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number, default: 0, required: true},
    usersLiked: {type: [String], required: true},
    usersDislikes: {type: [String], required: true}
});


// export du shema
module.exports = mongoose.model('Sauces', sauceSchema);