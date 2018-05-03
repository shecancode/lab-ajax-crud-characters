const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const Character = require('../models/characters');
const router = express.Router();



router.get('/', (req, res, next) => {
  res.render('../views/index');
});


router.get("/characters", (req, res, next) => {

  Character.find()
  .then((theList) => {
      res.json(theList)

  })

  .catch((err) => {
    console.log(err);
  });
});

router.get("/characters/:id", (req, res, next) => {

  Character.findById( req.params.id)
  .then((theCharacter) => {
    res.json(theCharacter);
    // console.log(theCharacter);
  })
  .catch((err) => {
    console.log(err);
  });
  
  })

router.post('/characters/create', function(req, res, next) {
 Character.create({
   name: req.body.theName,
   occupation: req. body.theOccupation,
   weapon: req.body.theWeapon,
   cartoon: req.body.theCartoon

 })

 .then((theCharacter) => {
   res.json(theCharacter);
 })

 .catch((err) => {
   console.log(err);
   next(err);
 })
  })// end post


  router.post("/characters/update/:id" ,  (req, res, next)=> {

    Character.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedCharacter) => {
      res.json(updatedCharacter);
    })
   .catch((err) => {
     console.log(err);
     next(err);
   })
    
  }) 





















module.exports = router;
