const { application } = require('express');
const express = require('express')
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')

app.use(morgan('tiny'))

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next();
})

// Middleware specific for the route /dogs
app.use('/dogs', (req, res, next) => {
    console.log('Hello I am a Dog!')
    next();
})

app.use((err,req,res,next) => {
    console.log('errrrrrrorrrorororoor')
})

// JUST A DEMO!

// a function to verify a specific route if you add it in the route as a callback.
// protecting a route.
const verifyPassword = ((req, res, next) => {
    const {password } = req.query;
    password === 'mysecret' ? next() : res.send('Sorry you need a password');

    throw new AppError('Password required', 401)
})

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.get('/dogs', (req, res) => {
    res.send('woof woof')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My secret is: is a secret sorry LOL!')
})

// Error handling. If nothing has match
app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})
app.listen(3001, () => {
    console.log('LISTENING TO PORT 3001')
})