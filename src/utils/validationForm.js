import { VALIDATION_PATTERNS } from '../variables/variables';
import { getValidateError } from '../utils/utils';

export function checkValidationInput({ value, pattern, dataLength }) {
    let messageErrors = '';
    let isValid = true;

    const regexp = VALIDATION_PATTERNS[pattern];
    const isValidFormat = regexp.test(value);

    if (!isValidFormat) {
        isValid = false;
        messageErrors = getValidateError(pattern);
    }

    const isValidLength = validateStringLength({ value, data: dataLength });

    if (!isValidLength) {
        isValid = false;
        messageErrors = getValidateError('LENGTH', dataLength);
    }

    return {
        isValid,
        messageErrors,
    };
}

export function checkValidationRepeatPassword({ initialValue, currentValue }) {
    let messageErrors = '';
    const isValid = initialValue === currentValue;

    if (!isValid) {
        messageErrors = getValidateError('REPEAT_PASSWORD');
    }

    return {
        isValid,
        messageErrors,
    };
}

function validateStringLength({ value, data = { min: 1, max: 30 } }) {
    return value.length >= data.min && value.length <= data.max;
}
