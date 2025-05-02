'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';
import { auth } from '../../services/api';

interface RegisterProps {
    onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setIsLoading(false);
            return;
        }

        try {
            const data = await auth.register(name, email, password);
            // console.log('Registro bem-sucedido:', data);
            router.push('/movies');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro durante o registro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Registro</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

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

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirmar Senha
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar'}
                </button>

                <p className={styles.switchText}>
                    Já tem uma conta?{' '}
                    <span className={styles.switchLink} onClick={onSwitchToLogin}>
                        Faça login
                    </span>
                </p>
            </form>
        </div>
    );
} 