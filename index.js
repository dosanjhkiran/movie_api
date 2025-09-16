// index.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;



// ---- Middleware ----
app.use(express.json());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

// ---- In-memory data 
const topMovies = [{
        id: 1,
        title: 'Pathaan',
        description: 'A RAW agent returns from exile.',
        director: {
            name: 'Siddharth Anand'
        },
        genre: 'Action'
    },
    {
        id: 2,
        title: 'Jawan',
        description: 'A man faces a corrupt system.',
        director: {
            name: 'Atlee'
        },
        genre: 'Action'
    },
    {
        id: 3,
        title: 'Rocky Aur Rani Kii Prem Kahaani',
        description: 'Star-crossed lovers swap families.',
        director: {
            name: 'Karan Johar'
        },
        genre: 'Romance'
    },
    {
        id: 4,
        title: 'Tu Jhoothi Main Makkaar',
        description: 'A rom-com about modern relationships.',
        director: {
            name: 'Luv Ranjan'
        },
        genre: 'Romance'
    },
    {
        id: 5,
        title: 'Animal',
        description: 'A violent family saga.',
        director: {
            name: 'Sandeep Reddy Vanga'
        },
        genre: 'Action'
    },
    {
        id: 6,
        title: 'Gadar 2',
        description: 'Tara Singh returns to Pakistan.',
        director: {
            name: 'Anil Sharma'
        },
        genre: 'Action'
    },
    {
        id: 7,
        title: 'OMG 2',
        description: 'A satire on education and faith.',
        director: {
            name: 'Amit Rai'
        },
        genre: 'Comedy'
    },
    {
        id: 8,
        title: 'Bhediya',
        description: 'A werewolf tale in Arunachal.',
        director: {
            name: 'Amar Kaushik'
        },
        genre: 'Horror'
    },
    {
        id: 9,
        title: 'Brahmāstra: Part One – Shiva',
        description: 'A fantasy adventure of astras.',
        director: {
            name: 'Ayan Mukerji'
        },
        genre: 'Fantasy'
    },
    {
        id: 10,
        title: 'Drishyam 2',
        description: 'A thriller of cover-ups and truth.',
        director: {
            name: 'Abhishek Pathak'
        },
        genre: 'Thriller'
    }
];

// ---- Routes ----
app.get('/', (req, res) => {
    res.send('Welcome to my Movies App!');
});

// Gets ALL movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Return a movie by title (case-insensitive)
app.get('/movies/:title', (req, res) => {
    const t = req.params.title.toLowerCase();
    const movie = topMovies.find(m => m.title.toLowerCase() === t);
    if (!movie) return res.status(404).json({
        error: 'Movie not found'
    });

    const {
        title,
        description,
        genre,
        director
    } = movie;
    res.json({
        title,
        description,
        genre,
        director,
        imageUrl: 'https://via.placeholder.com/300x450?text=Pathaan',
        featured: false


    });
});

// Return data about a genre (stub)
app.get('/genres/:name', (req, res) => {
    res.json({
        name: req.params.name,
        description: 'Genre description here (stub).'
    });
});

// Director by name (stub)
app.get('/directors/:name', (req, res) => {
    res.json({
        name: req.params.name,
        bio: 'short bio (stub)',
        birthYear: 1970,
        deathYear: null
    });
});

// Users: register (stub)
app.post('/users', (req, res) => {
    res.status(201).json({
        message: 'User would be created (stub).',
        received: req.body
    });
});

// Users: update username (stub)
app.put('/users/:username', (req, res) => {
    res.json({
        message: `User '${req.params.username}' would be updated (stub).`,
        received: req.body
    });
});

// Users: add favorite (stub)
app.post('/users/:username/favorites/:movieId', (req, res) => {
    res.json({
        message: `Movie ${req.params.movieId} added to ${req.params.username} favorites (stub).`
    });
});

// Users: remove favorite (stub)
app.delete('/users/:username/favorites/:movieId', (req, res) => {
    res.json({
        message: `Movie ${req.params.movieId} removed from ${req.params.username} favorites (stub).`
    });
});

// Users: deregister (stub)
app.delete('/users/:username', (req, res) => {
    res.json({
        message: `User '${req.params.username}' deregistered (stub).`
    });
});

// ---- 404 + error handlers ----
app.use((req, res) => res.status(404).json({
    error: 'Not Found'
}));
app.use((err, req, res, next) => {
    console.error('Application Error:', err);
    res.status(err.status || 500).json({
        error: 'Internal Server Error'
    });
});

// ---- Start ----
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});