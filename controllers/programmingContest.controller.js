const ProgrammingContest = require("../models/ProgrammingContest.model");
const userEmail = require("../mail");
const { v4: uuidv4 } = require('uuid');
const getPC = (req, res) =>{
res.render("programming-contest/register.ejs", {error: req.flash("error")});
};

const postPC = (req,res) =>{
    const {team_name,name_one, name_two, category, contact, email, institution, tshirt_one, tshirt_two} = req.body;
    console.log(team_name);
    console.log(name_one);
    console.log(name_two);
    console.log(category);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(tshirt_one);
    console.log(tshirt_two);

    let registrationFee = 0;
    if(category=="School"){
        registrationFee=500;
    }else if(category=="College"){
        registrationFee=600;
    }else{
        registrationFee=800;
    }

   const total= registrationFee;
   const paid=0;
   const selected=false;
   
   let error="";
   ProgrammingContest.findOne({team_name:team_name,contact:contact}).then((participant)=>{
       if(participant){
           error="Participant with this name and contact number already exists!";
           console.log(error);
           req.flash("error", error);
           res.redirect("/ProgrammingContest/register");
       }else{
        const key=uuidv4();
           const participant=new ProgrammingContest({
               team_name,
               name_one,
               name_two,
               category,
               contact,
               email,
               institution,
               paid,
               total,
               selected,
               tshirt_one,
               tshirt_two,
               key,
           });

           participant.save().then(()=>{
            error="Participant has been registered successfully!";
            userEmail(email,"Programming Contest",key,team_name);
           console.log(error);
           req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
           }).catch(()=>{
               error="An unexpected error occured while registering the participant!";
               req.flash("error", error);
               res.redirect("/ProgrammingContest/register");
           })
       }
   })
    
}

const getPCList = (req,res) =>{
    let all_participant = [];
     let error="";
     ProgrammingContest.find().then((data)=>{
         all_participant=data;
        res.render(programming-contest/list.ejs,{
            error:req.flash("error"),
            participant:all_participant,
        });

     }).catch(()=>{
        error="Failed to fetch data!";
        res.render("programming-contest/list.ejs",{
            error:req.flash("error",error),
            participants:all_participant,
        });
     });
    
}

const deletePC = (req,res) =>{
    let error = "";

    ProgrammingContest.deleteOne({ _id: req.params.id })
      .then(() => {
        let error = "Data has been deleted successfully!";
        req.flash("error", error);
        res.redirect("/ProgrammingContest/list");
      })
      .catch(() => {
        let error = "Failed to delete data";
        req.flash("error", error);
        res.redirect("/ProgrammingContest/list");
      });
}

const paymentDonePC = (req,res) =>{
    const id = req.params.id;

  ProgrammingContest.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = "Payment completed successfully!";
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          let error = "Data could not be updated!";
          req.flash("error", error);
          res.redirect("/ProgrammingCcontest/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated!";
      req.flash("error", error);
      res.redirect("/ProgrammingContest/list");
    });

}
const selectPC = (req,res) =>{
    const id = req.params.id;
  
    ProgrammingContest.findOne({ _id: id })
      .then((participant) => {
        participant.selected = true;
        participant
          .save()
          .then(() => {
            let error = "Participant has been selected successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
          })
          .catch(() => {
            let error = "Data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
          });
      })
      .catch(() => {
        let error = "Data could not be updated!";
        req.flash("error", error);
        res.redirect("/ProgrammingContest/list");
      });
}

module.exports = {getPC, postPC, getPCList, deletePC, paymentDonePC, selectPC};