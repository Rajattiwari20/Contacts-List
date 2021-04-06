const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact')
var app = express();

app.set("view engine" , "ejs");

app.set("views" , path.join(__dirname , "views"))

app.use(express.urlencoded());

app.use(express.static('assets'));

app.get('/' , function(req, res){

    Contact.find({} , function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }

        return res.render("home" ,{
            title : "Contacts List",
            contact_list : contacts
    
        });
    });

});


app.post('/contact' , function(req, res){
    
    // contactList.push(req.body);
    // return res.redirect('back')

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    } , function(err , newContact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("**************" , newContact);
        res.redirect('back');
    })
})


app.get('/delete-contact', function(req, res){

    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex( contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex , 1);
    // }

    let id = req.query.id;
    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect("back");
    })
})


app.listen(port , function(err){
    if(err){
        console.log("error" , err);
    }
    console.log("Express server is working")
})