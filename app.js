if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: '.env' });
}

const express = require('express');
const app = express();
const path = require('path')

// app.set('view engine', 'html')
// app.set('views', path.join(__dirname, 'views'))

// app.use(express.static(__dirname + '/public'))



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get('/', async(req, res) => {
    res.render('tic')
        // res.json({ error: err })
});

app.use((req, res, next) => {
    res.send('not found');
    console.log('not found');
})
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("on the port")
})