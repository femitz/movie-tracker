'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';
import { auth } from '../../services/api';

interface LoginProps {
    onSwitchToRegister: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await auth.login(email, password);
            // console.log('Login bem-sucedido:', data);
            router.push('/movies');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro durante o login');
        } finally {
            setIsLoading(false);
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
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