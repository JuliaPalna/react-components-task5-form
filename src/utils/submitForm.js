export function submitForm(prevState, queryData) {
    const email = queryData.get('email');
    const password = queryData.get('password');

    const newDataForm = { ...prevState, email, password };
    console.log(newDataForm);

    return { message: 'Данные отправлены', newDataForm };
}
