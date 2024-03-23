const MasterList = require('../models/master-list');

const person_index = (req, res) => {
    MasterList.find().sort({firstName: -1})
    .then((results) =>{
        const people = [{}];

        results.forEach(result => {
            const person = {
                id : result._id,
                fullName : result.firstName + ' ' + result.middleName.charAt(0) + '. ' + result.lastName,
                gender : result.gender,
                civilStatus : result.civilStatus,
                age : result.age,
                birthdate : result.birthdate,
                completeAddress : result.address[0].city + ' ' + result.address[0].region + ' ' + result.address[0].country,
                contactNumber : result.contactNumber,
                email : result.email,
                socialMedia : "facebook: " + result.socialMedia[0].facebook + ', instagram: ' + result.socialMedia[0].instagram,
            } 
            people.push(person)
        });

        //res.send(people)
       res.render('people', {title: "Home", people});
    })
    .catch((err) =>{
        console.log(err)
    })
};

const person_details = (req,res) => {
    let personID = req.params.id;
 
    MasterList.findById(personID)
    .then((result) =>{
        res.render('view-person', {title: result.firstName + ' ' + result.lastName, result})
    }).catch((err) => {
        res.status(404).render('404', {title: "Not Found"})
    })
 };

const person_create_get = (req, res) => {
    res.render('add-person', {title: "Add Member"})
};

const person_create_post = (req, res) =>{
    let form = req.body;
 
    const person = new MasterList()
 
    person.lastName = form.lastName;
    person.firstName = form.firstName;
    person.middleName = form.middleName;
    person.gender = form.gender;
    person.civilStatus = form.civilStatus;
    person.age = form.age;
    person.birthdate = form.birthdate;
    person.address = [{
        address : form.address1 + ' ' + form.address2,
        city: form.city,
        region: form.region,
        country: form.country
    }];
    person.contactNumber = form.contactNumber;
    person.email = form.email;
    person.socialMedia = [{
        facebook : form.facebook,
        instagram: form.instagram
    }];
    person.save()
    .then((result) =>{
       res.redirect('/person/add');
    })
    .catch((err) =>{
        console.log(err)
    });
 };

 const person_delete = (req,res) => {
    let personID = req.params.id;
 
   MasterList.findByIdAndDelete(personID)
   .then((result) =>{
        res.json({redirect : '/'});
    })
    .catch((err) =>{
        console.log(err)
    });
 };

module.exports = {
    person_index,
    person_details,
    person_create_get,
    person_create_post,
    person_delete
};