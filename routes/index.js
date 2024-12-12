const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const port = 3000;

// Middleware untuk body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS sebagai templating engine
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Middleware untuk session
app.use(session({
    secret: 'secret_key', // ganti dengan key yang lebih aman
    resave: false,
    saveUninitialized: true,
}));

// Routing
const routes = require('./routes/index');
app.use('/', routes);

// Menyajikan file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
