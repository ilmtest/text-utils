const {
    applySmartQuotes,
    cleanMultilineSpaces,
    cleanSpacesBeforePeriod,
    fixQuotes,
    fixSalutations,
    isUrl,
    lineBreaksToSpaces,
    reduceSpaces,
    sentenceCase,
    singleToDoubleQuotes,
    truncate,
} = require('./textUtils');

describe('isUrl', () => {
    it('valid url', () => {
        expect(isUrl('http://ilmtest.net')).toBeTruthy();
    });

    it('valid https url', () => {
        expect(isUrl('https://ilmtest.net')).toBeTruthy();
    });

    it('invalid url', () => {
        expect(isUrl('ilmtestnet')).toBeFalsy();
        expect(isUrl('http:///ilmtest.net')).toBeFalsy();
    });
});

describe('lineBreaksToSpaces', () => {
    it('lineBreaksToSpaces', () => {
        expect(lineBreaksToSpaces('abc\nefg \nhij')).toEqual('abc efg hij');
    });
});

describe('truncate', () => {
    it('empty string', () => {
        expect(truncate(null)).toEqual('[Undefined]');
    });

    it('less than max', () => {
        expect(truncate('test')).toEqual('test');
    });

    it('more than max', () => {
        expect(truncate('123456', 5)).toEqual('1234…');
    });
});

describe('fixQuotes', () => {
    it('2 single quotes', () => {
        expect(fixQuotes('ʿʿUthman')).toEqual('ʿUthman');
    });

    it('2 single quotes', () => {
        expect(fixQuotes("'ʿAlawī")).toEqual('ʿAlawī');
    });

    it('Two different kinds of ayn quotes', () => {
        expect(fixQuotes('‘ʿAtā')).toEqual('ʿAtā');
        expect(fixQuotes('‘ʿAbbās')).toEqual('ʿAbbās');
    });

    it('Hamza', () => {
        expect(fixQuotes('Atāʾ’')).toEqual('Atāʾ');
    });
});

describe('sentenceCase', () => {
    it('capitalize first letter', () => {
        expect(sentenceCase('this is')).toEqual('This is');
    });

    it('no-op', () => {
        expect(sentenceCase('. this is')).toEqual('. this is');
    });
});

describe('fixSalutations', () => {
    it('Messenger of Allah (*)', () => {
        expect(fixSalutations('Then the Messenger of Allah (sallahu alayhi wasallam) said')).toEqual(
            'Then the Messenger of Allah ﷺ said',
        );
    });

    it('Messenger (*)', () => {
        expect(fixSalutations('Then the Messenger (sallahu alayhi wasallam) said')).toEqual(
            'Then the Messenger ﷺ said',
        );
    });

    it('Prophet (*)', () => {
        expect(fixSalutations('Then the Prophet (sallahu alayhi wasallam) said')).toEqual('Then the Prophet ﷺ said');
    });

    it('Muhammad (*)', () => {
        expect(fixSalutations('Then Muhammad (sallahu alayhi wasallam) said')).toEqual('Then Muhammad ﷺ said');
    });

    it('Muḥammad (*)', () => {
        expect(fixSalutations('Then Muḥammad (sallahu alayhi wasallam) said')).toEqual('Then Muḥammad ﷺ said');
    });

    it('Must start with s', () => {
        expect(fixSalutations('Then Muḥammad (xsallahu alayhi wasallam) said')).toEqual(
            'Then Muḥammad (xsallahu alayhi wasallam) said',
        );
    });

    it('Must end with m', () => {
        expect(fixSalutations('Then Muḥammad (sallahu alayhi wasalla) said')).toEqual(
            'Then Muḥammad (sallahu alayhi wasalla) said',
        );
    });
});

describe('applySmartQuotes', () => {
    it('quotes', () => {
        expect(applySmartQuotes('The "quick brown" fox jumped "right" over the lazy dog.')).toEqual(
            'The “quick brown” fox jumped “right” over the lazy dog.',
        );
    });

    it('no-op', () => {
        expect(applySmartQuotes('this is')).toEqual('this is');
    });
});

describe('singleToDoubleQuotes', () => {
    it('quotes', () => {
        expect(singleToDoubleQuotes('The ‘‘quick brown’’ fox.')).toEqual('The “quick brown” fox.');
    });

    it('no-op', () => {
        expect(singleToDoubleQuotes('this is')).toEqual('this is');
    });
});

describe('cleanSpacesBeforePeriod', () => {
    it('removes the spaces for period', () => {
        expect(cleanSpacesBeforePeriod('This sentence has some space before period  . Hello')).toEqual(
            'This sentence has some space before period. Hello',
        );
    });

    it('removes the spaces for question mark', () => {
        expect(cleanSpacesBeforePeriod('This sentence has some space before period  ؟ Hello')).toEqual(
            'This sentence has some space before period؟ Hello',
        );

        expect(cleanSpacesBeforePeriod('الإسلام أم الكفر ؟')).toEqual('الإسلام أم الكفر؟');
    });

    it('removes the spaces for exclamation mark', () => {
        expect(cleanSpacesBeforePeriod('This sentence has some space before period  ! Hello')).toEqual(
            'This sentence has some space before period! Hello',
        );
    });

    it('removes the spaces for comma', () => {
        expect(cleanSpacesBeforePeriod('This sentence has some space before period  ، Hello')).toEqual(
            'This sentence has some space before period، Hello',
        );
    });

    it('no-op', () => {
        expect(cleanSpacesBeforePeriod('this is')).toEqual('this is');
    });
});

describe('reduceSpaces', () => {
    it('removes the spaces', () => {
        expect(reduceSpaces('This has    many spaces\n\nNext line')).toEqual('This has many spaces\n\nNext line');
    });

    it('no-op', () => {
        expect(reduceSpaces('this is')).toEqual('this is');
    });
});

describe('cleanMultilineSpaces', () => {
    it('removes the spaces', () => {
        expect(cleanMultilineSpaces('This has    \nmany spaces  \n\nNext line')).toEqual(
            'This has\nmany spaces\n\nNext line',
        );
    });

    it('no-op', () => {
        expect(cleanMultilineSpaces('this is')).toEqual('this is');
    });
});
