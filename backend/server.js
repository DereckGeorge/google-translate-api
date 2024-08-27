const express = require('express');
const bodyParser = require('body-parser');
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
const languageMap = require('./languageMap');

let CREDENTIALS;
try {
    CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
} catch (error) {
    console.error('Failed to parse CREDENTIALS from environment variable:', error);
    process.exit(1);
}

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const app = express();
app.use(bodyParser.json());

app.post('/translate', async(req, res)=>{
    const {text, targetLanguage} = req.body;
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        res.json({translation});
    } catch (error) {
        console.error(`Error at translateText --> ${error}`);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.post('/detect', async (req, res) => {
    const { text } = req.body;
    try {
        const detection = await translate.detect(text);
        const languageCode = detection[0].language;
        const languageName = languageMap[languageCode] || languageCode;
        res.json({ languageName });
    } catch (error) {
        console.error('Error at detectLanguage -->', error);
        res.status(500).json({ error: 'Language detection failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
