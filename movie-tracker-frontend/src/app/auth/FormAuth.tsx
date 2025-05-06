'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';
import { auth } from '../services/api';
import { useReward } from "react-rewards";

interface FormProps {
    isLogin: boolean;
    onSwitchToLogin: () => void;
}

export default function FormAuth({ onSwitchToLogin, isLogin }: FormProps) {
    const router = useRouter();

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { reward } = useReward('rewardId', 'confetti')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // dado direto do form
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!isLogin && password !== confirmPassword) {
            setError('As senhas não coincidem');
            setIsLoading(false);
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const data = isLogin ?
                await auth.login(email, password) :
                await auth.register(name, email, password);

            reward();
            // console.log('Registro bem-sucedido:', data);
            setTimeout(() => {
                router.push('/movies');
            }, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : `Ocorreu um erro durante o ${isLogin ? "login" : "registro"}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form key={isLogin ? 'login' : 'register'}
                className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>{isLogin ? 'Login' : 'Registro'}</h2>

                {!isLogin && <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Nome
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={styles.input}
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>}

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                        E-mail
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={styles.input}
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Senha
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={styles.input}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                {!isLogin && <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirmar Senha
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={styles.input}
                        // value={confirmPassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>}

                {error && <p className={styles.error}>{error}</p>}

                <br />
                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLogin ? (isLoading ? 'Entrando...' : 'Entrar') :
                        (isLoading ? 'Registrando...' : 'Registrar')}
                    <span id='rewardId' />
                </button>

                <p className={styles.switchText}>
                    {isLogin ? "Não tem uma conta? " :
                        "Já tem uma conta? "}
                    <span className={styles.switchLink} onClick={onSwitchToLogin}>
                        {isLogin ? "Registre-se" : "Faça login"}
                    </span>
                </p>
            </form>
        </div>
    );
} 