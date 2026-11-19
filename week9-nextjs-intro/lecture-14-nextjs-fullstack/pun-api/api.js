require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MIDDLEWARES
app.use(cors());            // Let a frontend on another address (e.g. localhost:5173) call the API
app.use(express.json());    // Read JSON bodies into req.body

// ROUTES
const punsRoute = require('./routes/puns');
app.use('/api/puns', punsRoute);

app.get('/', (req, res) => {
    res.send('Pun API: try /api/puns');
});

// CONNECT DB, then start listening
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to DB');
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
    })
    .catch(error => console.error('DB connection error:', error.message));
