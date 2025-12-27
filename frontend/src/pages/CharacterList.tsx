import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from '../api/client';
import type { Character, Info } from '../types';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterCardSkeleton } from '../components/CharacterCardSkeleton';
import { Pagination } from '../components/Pagination';
import styles from './CharacterList.module.scss';
import { motion } from 'framer-motion';

export const CharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<Info | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');
    const name = searchParams.get('name') || '';
    const status = searchParams.get('status') || '';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getCharacters(page, name, status);
                setCharacters(data.results);
                setInfo(data.info);
            } catch (err) {
                setCharacters([]);
                setInfo(null);
                setError('Персонажи не найдены или ошибка API.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, name, status]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (value) {
                newParams.set(name, value);
            } else {
                newParams.delete(name);
            }
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', newPage.toString());
            return newParams;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.page}>
            <motion.h1
                className={styles.title}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                Герои
            </motion.h1>

            <div className={styles.filters}>
                <input
                    type="text"
                    name="name"
                    placeholder="Поиск по имени..."
                    value={name}
                    onChange={handleSearch}
                />
                <select name="status" value={status} onChange={handleSearch}>
                    <option value="">Все статусы</option>
                    <option value="alive">Живой</option>
                    <option value="dead">Мертвый</option>
                    <option value="unknown">Неизвестно</option>
                </select>
            </div>

            {loading ? (
                <div className={styles.grid}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <CharacterCardSkeleton key={i} />
                    ))}
                </div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {characters.map(char => (
                            <CharacterCard key={char.id} character={char} />
                        ))}
                    </div>

                    {info && (
                        <Pagination
                            page={page}
                            totalPages={info.pages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};
