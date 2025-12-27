import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.logo}>
                <span>Rick & Morty</span>
            </NavLink>
            <div className={styles.links}>
                <NavLink to="/characters" className={({ isActive }) => clsx({ [styles.active]: isActive })}>Герои</NavLink>
                <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Переключить тему">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </nav>
    );
};
