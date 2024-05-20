const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

let links = {};

app.post('/api/create-link', (req, res) => {
    const { originalUrl } = req.body;
    const id = uuidv4();
    const tempLink = `https://your-vercel-app.vercel.app/download/${id}`;
    links[id] = { url: originalUrl, expiry: Date.now() + 24 * 60 * 60 * 1000 }; // 24 hours

    res.json({ link: tempLink });
});

app.get('/download/:id', (req, res) => {
    const { id } = req.params;
    const link = links[id];

    if (link && Date.now() < link.expiry) {
        res.redirect(link.url);
    } else {
        res.status(404).send('Link expired or not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
