import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter } from '../api/client';
import type { Character } from '../types';
import styles from './CharacterDetail.module.scss';
import clsx from 'clsx';
import { FaRobot, FaArrowLeft, FaMapMarkerAlt, FaGlobe, FaDna, FaVenusMars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { CharacterDetailSkeleton } from '../components/CharacterDetailSkeleton';

export const CharacterDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChar = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getCharacter(parseInt(id));
                setCharacter(data);
            } catch (err) {
                setError('Персонаж не найден.');
            } finally {
                setLoading(false);
            }
        };
        fetchChar();
    }, [id]);

    if (loading) return <CharacterDetailSkeleton />;
    if (error || !character) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.imageCol}>
                <img src={character.image} alt={character.name} />
            </div>
            <div className={styles.contentCol}>
                <div className={styles.header}>
                    <h1>{character.name}</h1>
                    <div className={styles.subtitle}>
                        <span className={clsx(styles.statusDot, styles[character.status])}></span>
                        {character.status} - {character.species}
                    </div>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.item}>
                        <span className={styles.label}><FaVenusMars /> Пол</span>
                        <span className={styles.value}>{character.gender}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}><FaDna /> Тип</span>
                        <span className={styles.value}>{character.type || 'Неизвестно'}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}><FaGlobe /> Происхождение</span>
                        <span className={styles.value}>{character.origin.name}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}><FaMapMarkerAlt /> Локация</span>
                        <span className={styles.value}>{character.location.name}</span>
                    </div>
                </div>


                {character.ai_description && (
                    <div className={styles.aiSection}>
                        <h3><FaRobot /> AI Анализ</h3>
                        <p>"{character.ai_description}"</p>
                    </div>
                )}

                <Link to="/characters" className={styles.backButton}>
                    <FaArrowLeft /> Назад к списку
                </Link>
            </div>
        </motion.div>
    );
};
