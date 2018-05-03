const mongoose = require("mongoose");
const Schema = mongoose.Schema;



  // mongoose.connect('mongodb://localhost/characters', {useMongoClient: true});



  // const characterSchema = Schema ({
    
  //   id: type: Number, require: true, unique: true},
  //   name: String,
  //   occupation: String,
  //   weapon: String,
  //   cartoon: Boolean,

  // });





const characterSchema = Schema({
  name:  String,
  occupation: String,
  weapon: String,
  cartoon: Boolean
});





  const Character = mongoose.model("Character", characterSchema);

  module.exports = Character;