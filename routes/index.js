const express = require('express');
const router = express.Router();

// Simulasi database user
const users = {
    user1: { username: 'user1', password: 'password123' }
};

// Halaman utama (Landing Page)
router.get('/', (req, res) => {
    res.render('index');
});

// Halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Proses login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Cek user di database (simulasi)
    if (users[username] && users[username].password === password) {
        req.session.user = username;  // Menyimpan user di session
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

// Halaman dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { username: req.session.user });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
