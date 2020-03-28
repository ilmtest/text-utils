// const CHARCODE_SHADDA = 1617;
// const CHARCODE_SUKOON = 1618;
const CHARCODE_SUPERSCRIPT_ALIF = 1648;
const CHARCODE_TATWEEL = 1600;
// const CHARCODE_ALIF = 1575;

const arabicNormChar = {
    ی: 'ي',
    ؤ: 'و',
    ئِ: 'ي',
    /* 'ك': 'ک', 'ﻷ': 'لا', 'ؤ': 'و', 'ى': 'ی', 'ي': 'ی', 'ئ': 'ی', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ٳ': 'ا', 'ة': 'ه', 'ء': '', 'ِ': '', 'ْ': '', 'ُ': '', 'َ': '', 'ّ': '', 'ٍ': '', 'ً': '', 'ٌ': '', 'ٓ': '', 'ٰ': '', 'ٔ': '', '�': '' */
};

const simplifyArabic = (str) => {
    return (
        str
            // eslint-disable-next-line
            .replace(/[^\u0000-\u007E]/g, function (a) {
                let retval = arabicNormChar[a];
                if (!retval) {
                    retval = a;
                }
                return retval;
            })
            .normalize('NFKD')
            .toLowerCase()
    );
};

// https://stackoverflow.com/questions/5224267/javascriptremove-arabic-text-diacritic-dynamically
const isCharTashkeel = (letter) => {
    if (typeof letter === 'undefined' || !letter) {
        return false;
    }

    const code = letter.charCodeAt(0);
    // 1648 - superscript alif
    // 1619 - madd: ~
    return code === CHARCODE_TATWEEL || code === CHARCODE_SUPERSCRIPT_ALIF || (code >= 1612 && code <= 1631); // tashkeel
};

const stripTashkeel = (input) => {
    let output = '';
    // todo consider using a stringbuilder to improve performance
    for (let i = 0; i < input.length; i += 1) {
        const letter = input.charAt(i);
        if (!isCharTashkeel(letter)) {
            // tashkeel
            output += letter;
        }
    }

    return output;
};

/**
 * https://stackoverflow.com/questions/4446244/how-to-check-if-any-arabic-character-exists-in-the-string-javascript
 * @param {*} input
 */
const isArabic = (input) => {
    const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    return pattern.test(input);
};

const sanitizeArabicQuery = (q) => {
    const query = simplifyArabic(q.trim());
    return stripTashkeel(query);
};

const formatArabic = (input) => {
    let value = input.replace('\t', '').trim();

    // remove spaces before punctuation
    value = value.replace(/ \./g, '.');
    value = value.replace(/ ،/g, '،');
    value = value.replace(/ :/g, ':');
    value = value.replace(/ !/g, '!');

    // remove spaces inside bracketed text
    value = value.replace(/\(\s*(.*?)\s*\)/g, '($1)');
    value = value.replace(/\[\s*(.*?)\s*\]/g, '[$1]');

    // remove trailing spaces on multilines
    value = value.replace(/^ +| +$/gm, '');

    return value;
};

module.exports = {
    formatArabic,
    isArabic,
    sanitizeArabicQuery,
};
