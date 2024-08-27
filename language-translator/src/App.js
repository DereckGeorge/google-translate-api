import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Container, Paper } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [inputText, setInputText] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en');
    const [translatedText, setTranslatedText] = useState('');

    const detectLanguage = async () => {
        if (inputText.trim()) {
            try {
                const response = await axios.post('/detect', { text: inputText });
                setDetectedLanguage(response.data.languageName);
            } catch (error) {
                console.error('Error detecting language:', error);
            }
        } else {
            alert('Please enter some text.');
        }
    };

    const translateText = async () => {
        if (inputText.trim()) {
            try {
                const response = await axios.post('/translate', { text: inputText, targetLanguage });
                setTranslatedText(response.data.translation);
            } catch (error) {
                console.error('Error translating text:', error);
            }
        } else {
            alert('Please enter some text.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} className="translator-container p-4">
                <Typography variant="h4" className="text-center mb-4">Language Translator</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Enter text to translate"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="mb-4"
                />
                <Button variant="contained" color="primary" onClick={detectLanguage} className="mb-3">Detect Language</Button>
                <Typography variant="body1">Detected Language: <strong>{detectedLanguage || 'None'}</strong></Typography>
                <FormControl fullWidth variant="outlined" className="my-4">
                    <InputLabel id="targetLanguage-label">Translate to</InputLabel>
                    <Select
                        labelId="targetLanguage-label"
                        id="targetLanguage"
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        label="Translate to"
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" onClick={translateText} className="mb-4">Translate</Button>

                <Typography variant="h6" className="text-center mb-2">Translated Text:</Typography>
                <Paper elevation={3} className="translated-text-container p-3">
                    <Typography variant="body1" className="translated-text">
                        {translatedText || 'Translation will appear here'}
                    </Typography>
                </Paper>
            </Paper>
        </Container>
    );
}

export default App;
