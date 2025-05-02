'use client';

import { useState, FormEvent } from 'react';
import styles from './Auth.module.css';

interface LoginProps {
    onSwitchToRegister: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // TODO: Implementar a chamada à API de login
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Falha no login. Por favor, verifique suas credenciais.');
            }

            const data = await response.json();
            // TODO: Implementar o armazenamento do token e redirecionamento
            console.log('Login bem-sucedido:', data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro durante o login');
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Login</h2>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button}>
                    Entrar
                </button>

                <p className={styles.switchText}>
                    Não tem uma conta?{' '}
                    <span className={styles.switchLink} onClick={onSwitchToRegister}>
                        Registre-se
                    </span>
                </p>
            </form>
        </div>
    );
} 