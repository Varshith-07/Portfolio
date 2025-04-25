const express = require("express");
const app= express();
const port=3000;
let path=require("path")
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const nodemailer = require('nodemailer');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsmate);

// app.use(cors());
app.use(express.json());

// Gmail transporter using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'varshithnaidu1312@gmail.com',        // replace with your Gmail address
    pass: 'sdgc uzdu rjbu ylsa'   // paste the generated App Password here
  }
});

app.post('/send', (req, res) => {
    const { name1, email, message } = req.body;
    console.log(`${name1} (${email}):\n\n${message}`);
    const mailOptions = {
      from: `${email}`,
      to: 'varshithnaidu1312@gmail.com', // you can forward it to yourself or any recipient
      subject: `New Contact Form Submission from ${name1}`,
      text: `Message from ${name1} (${email}):\n\n${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Email sent successfully!' });
      }
    });
  });


app.get("/",(req,res)=>{
    res.send("PortFolio");
})
app.get("/home",(req,res)=>{
    res.render("Home.ejs");
})
app.get("/edu",(req,res)=>{
    res.render("edu.ejs");
})
app.get("/projects",(req,res)=>{
    res.render("projects.ejs");
})
app.get("/skills",(req,res)=>{
    res.render("skills.ejs");
})
app.get("/about",(req,res)=>{
    res.render("about.ejs");
})
app.listen(3000,()=>{
    console.log(`Using port here ${port}`);
})