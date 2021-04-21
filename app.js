const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// ROUTES DEFINED BELOW
const routes = require('./routes/index');
app.use(routes);

app.listen(port, () => {
    console.log(`This app is running on port ${port}`);
});