
var express     = require ('express');
var app         = express();
app.use(express.json());
var myUser        =new Set();
myUser =require ("./models/user");

app.listen(666,() =>{
    console.log*('SERVER RUNNING ON  PORT 3000')
})
app.get ('/',
 (req, res) => {
 res.send ('HELLO WORLD WITH EXPRESS!!!');
    }
); 
app.get ('/mybasicinfo',
 (req, res) => {
 res.send ('THIS IS MY BASIC INFORMATION - My Name Is KURO!!');
 }
);
app.get ('/myexperience',
 (req, res) => {
 res.send ('THIS IS MY EXPERIENCE');
 }
);
app.get ('/getrequest',
 (req, res) => {
 res.send ('THIS IS A GET REQUEST');
 }
);
app.delete ('/deleterequest',
 (req, res) => {
 res.send ('THIS IS A DELETE REQUEST');
 }
);
app.put ('/putrequest',
 (req, res) => {
 res.send ('THIS IS A PUT REQUEST');
 });

app.get ('/getuser', 
(req, res)=>{
   
//while(i< myUser.size)  {
       res.send (myUser);
       res.json (myUser);     
//  };
});
app.post ('/adduser' , 
   (req, res)=>{
        console.log(req.body);
        res.send ('POST USER ADDED');
   });

app.post ('/updateuser/:idUser' , (req, res)=>{
    console.log(req.body);
    console.log ( req.params.idUser);
    res.send ('USER UPDATED');
});