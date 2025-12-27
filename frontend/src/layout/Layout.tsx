import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import styles from './Layout.module.scss';

export const Layout = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Rick and Morty Explorer.</p>
            </footer>
        </div>
    );
};
