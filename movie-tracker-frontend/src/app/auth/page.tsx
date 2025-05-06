'use client';

import { useState, useEffect } from 'react';
import FormAuth from './FormAuth';
import styles from './Auth.module.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const circle = document.querySelector(`.${styles.cursorCircle}`) as HTMLElement;
            if (circle) {
                circle.style.left = `${e.clientX}px`;
                circle.style.top = `${e.clientY}px`;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.cursorCircle} />
            <FormAuth onSwitchToLogin={toggleAuthMode} isLogin={isLogin} />
        </div>
    );
} 