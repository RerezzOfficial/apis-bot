const express = require('express');
const router = express.Router();

// Simulasi database user
const users = {
    user1: { username: 'user1', password: 'password123' }
};

// Halaman utama (Landing Page)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Halaman login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
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
        res.sendFile(path.join(__dirname, '../views/dashboard.html'));
    } else {
        res.redirect('/login');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error during logout');
        }
        res.redirect('/');
    });
});

module.exports = router;
