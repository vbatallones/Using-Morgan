const express = require('express')
const app = express();
const morgan = require('morgan');


app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.send('Homepage')
})
app.get('/dogs', (req,res) => {
    res.send('woof woof')
})

app.listen(3001, () => {
    console.log('LISTENING TO PORT 3001')
})