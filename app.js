require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT;

const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.post('/', (req, res) => {
    var msg = {
        to: process.env.OUTBOUND_EMAIL,
        from: 'kittyrtc@gmail.com',
        subject: req.body.subjectline,
        text: req.body.inputemail + " says:\n\n " + req.body.emailbody,
    };

    sgMail.send(msg);

    res.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.log('encountered err', err);
    }

    console.log(`Listening on port ${port}`);
});