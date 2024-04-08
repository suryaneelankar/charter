const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { query } = require('express');
const jwt = require('jsonwebtoken');

const nodeMailer = require('nodemailer');
const sendGridTransporter = require('nodemailer-sendgrid-transport') 


module.exports.addUser = (req, res, next) => {
    console.log(req.get('Cookie'), 'our cookie is');
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
    .hash(password, 12)
    .then(hash => {
      console.log('Hash ', hash)
      const user = new User({ email: email, name: name, password:hash });
      user.save()
        .then(() => res.send('User added successfully'))
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err.message))

}

module.exports.validateAndLoginUser = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   let loadedUser;

   User.findOne({email:email}).then(user => {
    console.log(user,'gpt ude tod')
    loadedUser = user;
    bcrypt
    .compare(password, user.password)
    .then(result => {
      console.log(result)
      const token = jwt.sign(
        {
         email: req.body.email,
         userId: loadedUser._id.toString()
        },
        'somesupersecretkey',
        { expiresIn : '1h' }
      )
      if(result){
        res.status(200).json({
          token: token,
          data: loadedUser,
          message: 'data retrived successfully'
        })
      }else{
        res.send('email or password is wrong');
      }
      
    })
    .catch(err => console.error(err.message));
   }).catch(err => {
    console.log(err,'err for login');
    res.status(402).json({
      err: err,
      statusCode: 402,
      message: 'email or password is wrong'
    })
    // res.send('email or password is wrong');
   })

}

module.exports.resetPassword = (req, res, next) => {
    const email = req.body.email;

    crypto.randomBytes(32,(err,buffer) => {
        const token = buffer.toString('hex');
        
        User.findOne({email:email})
        .then((user) => {
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 360000;
          user.save();
          res.send(`http://localhost:3000/user/reset-password/${token}`);
        }).catch(err => {
            console.log(err)
            res.send('please enter valid email to reset password');
        });
    })
}

module.exports.resetNewPassword = (req, res, next) => {
    const token = req.params.token;
    const newPassword = req.body.password;
    let resetUser;
    User.findOne({resetToken:token})
    .then((user) => {
        resetUser = user;
        console.log('user is::>>',user);
        console.log('newPass is:::>>',newPassword);
        bcrypt.hash(newPassword,12)
        .then((hashedPassword) => {
            console.log('hashpass is:::>>',hashedPassword);
            console.log('resetUser is::>>',resetUser)
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            resetUser.save()
            res.send('password reset successfully');
        })
        .catch(err => {console.log(err),res.send('unable to reset')});
    })
    .catch(err => {
        console.log(err);
        res.send('invalid token');
    })

}