import { Skeleton } from './Skeleton';
import styles from './Card.module.scss';

export const CharacterCardSkeleton = () => {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <Skeleton width="100%" height="100%" style={{ position: 'absolute' }} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Skeleton width="70%" height="2rem" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width="40%" height="1rem" />
                </div>
                <div className={styles.section} style={{ marginTop: '1rem' }}>
                    <Skeleton width="50%" height="0.8rem" style={{ marginBottom: '0.3rem' }} />
                    <Skeleton width="80%" height="1rem" />
                </div>
                <div className={styles.section} style={{ marginTop: '1rem' }}>
                    <Skeleton width="50%" height="0.8rem" style={{ marginBottom: '0.3rem' }} />
                    <Skeleton width="60%" height="1rem" />
                </div>
            </div>
        </article>
    );
};
