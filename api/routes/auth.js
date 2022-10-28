const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const OTPCodes = require("../models/OTPCodes");
const nodemailer = require("nodemailer");
//sing up

router.post("/singup", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const saltt = await bcrypt.genSalt(10);
    const hashedPasss = await bcrypt.hash(req.body.confirmpassword, saltt);

    if (password !== confirmpassword) {
      return res.status(500).send({ message: "Passwords Must be same" });
    }

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      midllename: req.body.midllename,
      phonenumber: req.body.phonenumber,
      password: hashedPass,
      confirmpassword: hashedPasss,
    });
    const user = await newUser.save();
    return res.status(200).send({ message: "NEW USSER CREATED " });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {}

});

///////
router.post("/verify", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
   !user && res.status(400).json("Wrong credentials!");
    const userr = await OTPCodes.findOne({ code: req.body.code });
   !userr && res.status(400).json("Wrong otp!");
    const userrr = await OTPCodes.findOne({ email: req.body.email });
    if (user.email === userrr.email) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
    return  res.status(500).json(others);
    }
  } catch (err) {
    res.status(500).json("wrong credentials");
  }
});

////////////////////////////////////////////////////////////////



//////////////////////////////send otp


router.post("/send-otp", async (req, res) => {
  const email = req.body.email;

  // Check if email exists
  const userExists = await User.findOne({ email });
  if (!userExists)
    return res.status(400).send({ message: "email not registered" });

  console.log(userExists.username);

  // Delete previous OTP codes;
  const previousOTPs = await OTPCodes.find({ email: email });
  for (previousOTP of previousOTPs) {
    OTPCodes.findOneAndDelete(email, function (err, result) {
      if (err) {
        console.log(err);
      }
    });
  }

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);
  try {
    await OTPCodes.create({
      email: userExists.email,
      code: generatedOTP,
    });

    sendEmail(generatedOTP, userExists.email);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).send({ message: "OTP Sent" });
});



////////////// send email

function sendEmail(code, receiver) {
  const yourEmail = "mascuudsalaad276@gmail.com";
  const yourPassword = "nealimrtyzayjtgd";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: yourEmail,
      pass: yourPassword,
    },
  });
  const mailOptions = {
    from: yourEmail,
    to: `${receiver}`,
    subject: "Verification Code",
    text: `Dear User, your verification code is ${code}.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = router;
