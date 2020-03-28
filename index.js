const arabicUtils = require('./src/arabicUtils');
const textUtils = require('./src/textUtils');
const transliterationUtils = require('./src/transliterationUtils');

module.exports = {
    ...arabicUtils,
    ...textUtils,
    ...transliterationUtils,
};
