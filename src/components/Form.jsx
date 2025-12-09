import { useActionState, useEffect, useRef, useState } from 'react';
import { submitForm } from '../utils/submitForm';
import {
    checkValidationInput,
    checkValidationRepeatPassword,
} from '../utils/validationForm';
import styles from '../styles/form.module.css';

export const Form = () => {
    const [formState, formAction, isPending] = useActionState(submitForm, {
        email: '',
        password: '',
    });

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const submitButtonRef = useRef(null);

    const isValidForm =
        !errors.email &&
        !errors.password &&
        !errors.repeatPassword &&
        dataForm.email &&
        dataForm.password &&
        dataForm.repeatPassword;

    const handleChangeEmail = ({ target }) => {
        setDataForm({ ...dataForm, email: target.value });

        const { isValid, messageErrors } = checkValidationInput({
            value: target.value,
            pattern: 'EMAIL',
            dataLength: { min: 3, max: 20 },
        });

        if (!isValid) {
            setErrors({ ...errors, email: messageErrors });
        } else {
            setErrors({ ...errors, email: '' });
        }
    };

    const handleChangePassword = ({ target }) => {
        setDataForm({ ...dataForm, password: target.value });

        const { isValid, messageErrors } = checkValidationInput({
            value: target.value,
            pattern: 'PASSWORD',
            dataLength: { min: 3, max: 6 },
        });

        if (!isValid) {
            setErrors({ ...errors, password: messageErrors });
        } else {
            setErrors({ ...errors, password: '' });
        }

        if (dataForm.repeatPassword) {
            checkRepeatePassword({
                initialValue: target.value,
                currentValue: dataForm.repeatPassword,
            });
        }
    };

    const handleChangeRepeatPassword = ({ target }) => {
        setDataForm({ ...dataForm, repeatPassword: target.value });

        const { isValid, messageErrors } = checkValidationInput({
            value: target.value,
            pattern: 'PASSWORD',
            dataLength: { min: 3, max: 6 },
        });

        if (!isValid) {
            setErrors({ ...errors, repeatPassword: messageErrors });
        } else {
            setErrors({ ...errors, repeatPassword: '' });
        }

        checkRepeatePassword({
            initialValue: dataForm.password,
            currentValue: target.value,
        });
    };

    const checkRepeatePassword = ({ initialValue, currentValue }) => {
        const { isValid, messageErrors } = checkValidationRepeatPassword({
            initialValue,
            currentValue,
        });

        if (!isValid) {
            setErrors({ ...errors, repeatPassword: messageErrors });
        } else {
            setErrors({ ...errors, repeatPassword: '' });
        }
    };

    const handleCheckValidForm = () => {
        if (isValidForm && submitButtonRef.current) {
            submitButtonRef.current.focus();
        }
    };

    const resetForm = () => {
        setDataForm({
            email: '',
            password: '',
            repeatPassword: '',
        });

        setErrors({
            email: '',
            password: '',
            repeatPassword: '',
        });
    };

    useEffect(() => {
        if (formState.message) {
            resetForm();
        }
    }, [formState.message]);

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles['form-group']}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Введите Email"
                    className={styles.input}
                    value={dataForm.email}
                    onChange={handleChangeEmail}
                    onBlur={handleCheckValidForm}
                />
                {errors.email && (
                    <div className={styles.error}>{errors.email}</div>
                )}
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    className={styles.input}
                    value={dataForm.password}
                    onChange={handleChangePassword}
                    onBlur={handleCheckValidForm}
                />
                {errors.password && (
                    <div className={styles.error}>{errors.password}</div>
                )}
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="repeatPassword">Повторить пароль:</label>
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Введите пароль повторно"
                    className={styles.input}
                    value={dataForm.repeatPassword}
                    onChange={handleChangeRepeatPassword}
                    onBlur={handleCheckValidForm}
                />
                {errors.repeatPassword && (
                    <div className={styles.error}>{errors.repeatPassword}</div>
                )}
            </div>

            <button
                type="submit"
                ref={submitButtonRef}
                className={styles.button}
                disabled={!isValidForm || isPending}
            >
                Зарегистрироваться
            </button>

            {formState.message && <div>{formState.message}</div>}
        </form>
    );
};
