const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MasterList = require('./models/master-list');
const peopleRoutes = require('./routes/peopleRoutes');

// express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://salt-and-light-church-2018:qkKMXCJ0PGwI6nH2@atlascluster.kb6rdpo.mongodb.net/salt-and-light-church?retryWrites=true&w=majority&appName=AtlasCluster";
mongoose.connect(dbURI)
.then((result) => {
    //listen for requests
    app.listen(3000);
    console.log("connected to db");
})
.catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs')

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))

// bootstrap demo
app.get('/bootstrap-demo', (req, res) => {
    res.render('bootstrap-demo')
})

//people routes
app.use('/person',peopleRoutes);


// app.get('/', (req, res) =>{
//     MasterList.find().sort({firstName: -1})
//     .then((results) =>{
//         const people = [{}];

//         results.forEach(result => {
//             const person = {
//                 id : result._id,
//                 fullName : result.firstName + ' ' + result.middleName.charAt(0) + '. ' + result.lastName,
//                 gender : result.gender,
//                 civilStatus : result.civilStatus,
//                 age : result.age,
//                 birthdate : result.birthdate,
//                 completeAddress : result.address[0].city + ' ' + result.address[0].region + ' ' + result.address[0].country,
//                 contactNumber : result.contactNumber,
//                 email : result.email,
//                 socialMedia : "facebook: " + result.socialMedia[0].facebook + ', instagram: ' + result.socialMedia[0].instagram,
//             } 
//             people.push(person)
//         });

//         //res.send(people)
//        res.render('people', {title: "Home", people});
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// })

app.use((req,res, next) =>{
    console.log("new request made: ");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
})


app.get('/about', (req, res) =>{
    res.render('about', {title: "About"}); 
});

app.get('/sophia', (req, res) =>{
    res.render('sophia', {title: "Sophia"});
});

app.get('/attendance/create', (req, res) =>{
    res.render('create', {title: "Create"});
});

//redirects
app.get('/about-us', (req, res)=>{
    res. redirect('/about', {title: "About"});
});

// 404s
app.use((req,res) => {
    res.status(404).render('404', {title: "Not Found"})
});