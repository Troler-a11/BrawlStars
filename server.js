const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // Для твого HTML

const API_KEY = "ТВІЙ_JWT_ТОКЕН_ЯКИЙ_ТИ_СКИНУВ";

app.get('/api/player/:tag', async (req, res) => {
    try {
        const tag = req.params.tag.replace('#', '%23');
        const response = await axios.get(`https://api.brawlstars.com/v1/players/${tag}`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Гравець не знайдений або помилка API" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
