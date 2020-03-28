const { applyRules, autoTransliterate } = require('./transliterationUtils');

describe('auto transliterate', () => {
    it('auto transliterate', () => {
        expect(autoTransliterate("Turaa'b")).toEqual('Turāʿb');
    });
});

describe('applyRules', () => {
    it('sentence with whole word and normal text', () => {
        const dictionary = {
            Sufyan: 'Sufyān',
            '\\bAli\\b': 'ʿAlī',
        };

        expect(applyRules(dictionary, 'Ali and Sufyan went with Alison to the park.')).toEqual(
            'ʿAlī and Sufyān went with Alison to the park.',
        );
    });
});
