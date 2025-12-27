import { Skeleton } from './Skeleton';
import styles from '../pages/CharacterDetail.module.scss';

export const CharacterDetailSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageCol}>
                <Skeleton width="100%" height="400px" style={{ borderRadius: '1rem' }} />
            </div>
            <div className={styles.contentCol}>
                <div className={styles.header}>
                    <Skeleton width="60%" height="3rem" style={{ marginBottom: '1rem' }} />
                    <Skeleton width="40%" height="1.5rem" />
                </div>
                <div className={styles.infoGrid} style={{ marginTop: '2rem' }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={styles.item}>
                            <Skeleton width="30%" height="1rem" style={{ marginBottom: '0.5rem' }} />
                            <Skeleton width="70%" height="1.2rem" />
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <Skeleton width="30%" height="2rem" style={{ marginBottom: '1rem' }} />
                    <Skeleton width="100%" height="4rem" />
                </div>
            </div>
        </div>
    );
};
