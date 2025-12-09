export const getValidateError = (type, data = {}) => {
    const errors = {
        EMAIL: `Email должен содержать символы: латинские буквы, цифры и символы ".", "-", "_", а также символ "@" и точку в доменной части.`,
        PASSWORD: `Пароль должен содержать символы: цифры.`,
        REPEAT_PASSWORD: `Пароли не совпадают`,
        LENGTH: `Длина должна быть от ${data.min} до ${data.max} символов`,
    };

    return errors[type];
};
