const express = require('express'); 
const path = require('path');
const PORT = process.env.PORT ?? 3001; 
const app = express(); 

app.use(express.static('public')); 

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Application is running @ http://localhost:${PORT}`);
}); 