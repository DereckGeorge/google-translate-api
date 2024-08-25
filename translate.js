const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
const languageMap = require('./languageMap');

// Load credentials from the environment variable
let CREDENTIALS;
try {
    CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
} catch (error) {
    console.error('Failed to parse CREDENTIALS from environment variable:', error);
    process.exit(1);
}

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});
const translateText = async (text, targetLanguage) => {
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error(`Error at translateText --> ${error}`);
        return null;
    }
};

const detectLanguage = async (text) => {
    try {
        const detection = await translate.detect(text);
        const languageCode = detection[0].language;
        const languageName = languageMap[languageCode] || languageCode;
        return languageName;
    } catch (error) {
        console.error(`Error at detectLanguage --> ${error}`);
        return null;
    }
};

detectLanguage('Unaitwa nani')
    .then((languageName) => {
        console.log('Detected Language:', languageName);
    })
    .catch((err) => console.error(err)
    );

translateText('Unaitwa nani kijana', 'en')
    .then((translation) => {
        console.log(translation);
    })
    .catch((err) => console.error(err)
    );

