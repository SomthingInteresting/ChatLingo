const axios = require('axios');

async function translateMessage(text, targetLang, apiKey) {
  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', 
  {
    text: [text],
    target_lang: targetLang,
  },
  {
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    }
  }
);

    if (response.data && response.data.translations && response.data.translations.length > 0) {
      return response.data.translations[0].text;
    } else {
      throw new Error('No translation available');
    }
  } catch (error) {
    console.error(`Error translating message: ${error.message}`);
    // Return original text if translation fails
    return text;
  }
}

module.exports = translateMessage;
