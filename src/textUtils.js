const OPEN_DOUBLE_QUOTES = '“';
const CLOSE_DOUBLE_QUOTES = '”';

const lineBreaksToSpaces = (input) => {
    let value = input.replace(/[\r\n]+/g, ' ');
    value = value.replace(/\s\s+/g, ' ');

    return value;
};

const condenseMultilines = (text) => text.replace(/\n\s*\n/g, '\n');

const truncate = (val, n = 150) => {
    if (!val) {
        return '[Undefined]';
    }
    return val.length > n ? `${val.substr(0, n - 1)}…` : val;
};

const sentenceCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const replaceAt = (input, index, replacement) =>
    input.substr(0, index) + replacement + input.substr(index + replacement.length);

const applySmartQuotes = (text, symbol = '"', openSymbol = OPEN_DOUBLE_QUOTES, closeSymbol = CLOSE_DOUBLE_QUOTES) => {
    let value = text;

    if (value.slice(-1) === openSymbol) {
        value = value.slice(0, -1) + closeSymbol;
    }

    // eslint-disable-next-line prefer-template
    value = value.replace(new RegExp(symbol + '([^' + symbol + ']*)' + symbol, 'g'), openSymbol + '$1' + closeSymbol);

    const endQuoteIndex = value.indexOf(closeSymbol);
    const startQuoteIndex = value.indexOf(openSymbol);
    if (startQuoteIndex === -1 && endQuoteIndex >= 0) {
        value = replaceAt(value, endQuoteIndex, openSymbol);
    }

    return value;
};

const singleToDoubleQuotes = (text) => {
    const value = text.replace('‘‘', OPEN_DOUBLE_QUOTES);
    return value.replace('’’', CLOSE_DOUBLE_QUOTES);
};

const cleanSpacesBeforePeriod = (text) =>
    text.replace(/\s+\./g, '.').replace(/\s+؟/g, '؟').replace(/\s+!/g, '!').replace(/\s+،/g, '،');

const reduceSpaces = (text) => text.replace(/  +/g, ' ');

const cleanMultilineSpaces = (text) => text.replace(/^ +| +$/gm, '');

const fixQuotes = (text) => text.replace(/ʿʿ|‘ʿ|‘ʿ'|'ʿ/g, 'ʿ').replace(/ʾ’|’ʾ|ʾ'|'ʾ/g, 'ʾ');

const fixSalutations = (text) => {
    return text.replace(/(Messenger of (Allah|Allāh)|Messenger|Prophet|Mu[hḥ]ammad) *\(s[^)]*m\)*/gi, (matched) => {
        return `${matched.substring(0, matched.lastIndexOf('(')).trim()} \ufdfa`;
    });
};

const titleCase = (text) =>
    text
        .trim()
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join('');

const isUrl = (input) => {
    // eslint-disable-next-line
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    return urlRegex.test(input);
};

const removeTrailingSlash = (url) => {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }

    return url;
};

module.exports = {
    applySmartQuotes,
    cleanMultilineSpaces,
    cleanSpacesBeforePeriod,
    condenseMultilines,
    fixQuotes,
    fixSalutations,
    isUrl,
    lineBreaksToSpaces,
    reduceSpaces,
    removeTrailingSlash,
    sentenceCase,
    singleToDoubleQuotes,
    titleCase,
    truncate,
};
