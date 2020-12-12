var express = require('express');
var router = express.Router();
var Contact = require('../models/Contacts');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const form = express();

form.use(bodyParser.json());
form.use(bodyParser.urlencoded({ extended: false }));

form.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.treasures.co.uk',
            port: 487,
            auth: {
                user: '',
                pass: ''
            }
        })

        let mailOptions = {
            from: '', 
            to: '',
            replyTo: '',
            subject: 'New Message',
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }

            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
});

const PORT = process.env.PORT || 4000

form.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});


//router.post('/Contact', function (req, res) {
//    const newContact = new Contact({
//        name: req.body.name,
//        email: req.body.email,
//        comment: req.body.message,
//    });
//    newContact
//        .save()
//        .then((data) => { res.json(data); })
//        .catch((error) => { res.json(error); });
//});

module.exports = router;