const { sentenceCase } = require('./textUtils');

const autoTransliterationRules = {
    aa: 'ā',
    ee: 'ī',
    oo: 'ū',
    "'": 'ʿ',
};

const WORD_BOUNDARY = '\\b';

const applyRules = (dictionary, text) => {
    const regex = new RegExp(Object.keys(dictionary).join('|'), 'g');
    return text.replace(regex, (matched) => {
        const replacement = dictionary[matched] || dictionary[WORD_BOUNDARY + matched + WORD_BOUNDARY];
        return replacement;
    });
};

const autoTransliterate = (source) => applyRules(autoTransliterationRules, source);

const boundedSource = (whole, source) => (whole ? WORD_BOUNDARY + source + WORD_BOUNDARY : source);

const reduceSourceToTarget = ({ target, whole, caseless }) => (full, source) => {
    const toReturn = { ...full };
    const wrappedSource = boundedSource(whole, source);

    toReturn[wrappedSource] = target;

    if (caseless) {
        toReturn[boundedSource(whole, sentenceCase(source))] = sentenceCase(target);
        toReturn[boundedSource(whole, source.toLowerCase())] = target.toLowerCase();
    }

    return toReturn;
};

const reduceRuleToDictionary = (dictionary, rule) => {
    return rule.sources.split('|').reduce(reduceSourceToTarget(rule), dictionary);
};

// https://github.com/LasaleFamine/string-normalize-es6/blob/master/src/index.js
const normalize = (input) =>
    input
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/`|ʾ|ʿ|-/g, '');

module.exports = {
    applyRules,
    autoTransliterate,
    normalize,
    reduceRuleToDictionary,
};
