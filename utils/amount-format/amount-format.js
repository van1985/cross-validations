// @flow

const privateFormatAmount = (
    number,
    decimalLength = 2,
    sectionDelimiter = '.',
    decimalLimiter = ','
) => {
    let parsedNumber = parseFloat(number);
    if (parsedNumber != number && number) {
        parsedNumber = parseFloat(number.replace(decimalLimiter, sectionDelimiter));
    }
    if (!isNaN(parsedNumber)) {
        const re = '\\d(?=(\\d{' + 3 + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        const num = parsedNumber.toFixed(Math.max(0, ~~decimalLength));

        return num
            .replace('.', decimalLimiter)
            .replace(new RegExp(re, 'g'), '$&' + (sectionDelimiter || ','));
    } else {
        return '';
    }
};

const formatAmount = (number, lang, decimals = 2, showCurrency = true) => {
    switch (lang) {
        case 'en':
            return privateFormatAmount(number, decimals, ',', '.');
        case 'ar':
            return privateFormatAmount(number, decimals, '.', ',') + (showCurrency ? " ARS" : "");
        case 'ch':
            return privateFormatAmount(number, decimals, '.', ',') + (showCurrency ? " CLP" : "");
        case 'es':
        default:
            return privateFormatAmount(number, decimals, '.', ',') + (showCurrency ? " €" : "");
    }
};

export default formatAmount