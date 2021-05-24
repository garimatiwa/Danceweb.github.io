const express=require("express");
const path=require("path");
const port=3000;
const app=express();
var mongoose = require('mongoose');
const bodyparser= require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var contact = mongoose.model('contact', contactSchema);
// express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded())
// set the template engine as pug
app.set('view engine','pug');
// set the views directory
app.set('views',path.join(__dirname,'views'))
// our pug demo endpoint
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
}).catch(()=>{
    res.status(400).send("Item was not saved in database");

});
// res.status(200).render('contact.pug');
});
app.listen(3000,function(){
    console.log("This application started successfully on port");
});