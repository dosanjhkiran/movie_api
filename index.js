const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/json
app.use(bodyParser.json())
// Simple health route
app.get('/', (req, res) => {
    res.send('Movie API is running ✅');
});
// Example POST route
app.post('/echo', (req, res) => {
    res.json({
        youSent: req.body
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));