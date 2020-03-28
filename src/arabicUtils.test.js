const { formatArabic, isArabic, sanitizeArabicQuery } = require('./arabicUtils');

describe('sanitizeArabicQuery', () => {
    it('removes vowels from arabic', () => {
        const result = sanitizeArabicQuery('مُحَمَّدُ بْنُ إِسْمَاعِيلَ');
        expect(result).toEqual('محمد بن اسماعيل');
    });
});

describe('isArabic', () => {
    it('should be true for Arabic text', () => {
        expect(isArabic('مُحَمَّدُ بْنُ إِسْمَاعِيلَ')).toBe(true);
    });

    it('should be true for partial Arabic text', () => {
        expect(isArabic('مُحَمَّدُ asdf إِسْمَاعِيلَ')).toBe(true);
    });

    it('should be false for English text', () => {
        expect(isArabic('This is a sws test!!')).toBe(false);
    });

    it('should be false for English text with special symbols', () => {
        expect(isArabic('This is a ﷺ test!!')).toBe(false);
    });
});

describe('formatArabic', () => {
    it('remove tabs', () => {
        expect(formatArabic('a\tb')).toEqual('ab');
    });

    it('remove space before dot', () => {
        expect(formatArabic('a .')).toEqual('a.');
    });

    it('remove space before comma', () => {
        expect(formatArabic('a ،')).toEqual('a،');
    });

    it('remove space before colon', () => {
        expect(formatArabic('a :')).toEqual('a:');
    });

    it('remove space inside brackets', () => {
        expect(formatArabic('( a )')).toEqual('(a)');
    });

    it('remove space inside square brackets', () => {
        expect(formatArabic('[ a]')).toEqual('[a]');
    });

    it('remove trailing spaces on multilines', () => {
        expect(formatArabic('a   \nb    \nc    ')).toEqual('a\nb\nc');
    });
});
