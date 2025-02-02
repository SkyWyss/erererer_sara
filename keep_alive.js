const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Le bot est en ligne !');
});

const PORT = 8080; // Replit utilise souvent le port 8080
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur en ligne sur http://0.0.0.0:${PORT}`);
});
