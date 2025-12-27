import { Link } from 'react-router-dom';
import type { Character } from '../types';
import styles from './Card.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CharacterCardProps {
    character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <motion.article
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.imageWrapper}>
                <img src={character.image} alt={character.name} loading="lazy" />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.name}>
                        <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </h2>
                    <div className={styles.status}>
                        <span className={clsx(styles.dot, styles[character.status.toLowerCase()] || styles.unknown)}></span>
                        {character.status} - {character.species}
                    </div>
                </div>
                <div className={styles.section}>
                    <span className={styles.label}>Последняя локация:</span>
                    <span className={styles.value}>{character.location.name}</span>
                </div>
                <div className={styles.section}>
                    <span className={styles.label}>Впервые замечен в:</span>
                    <span className={styles.value}>
                        Эпизод {character.episode[0]?.split('/').pop()}
                    </span>
                </div>
            </div>
        </motion.article>
    );
};
