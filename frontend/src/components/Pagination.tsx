import styles from './Pagination.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                <FaChevronLeft /> Prev
            </button>
            <span className={styles.info}>
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next <FaChevronRight />
            </button>
        </div>
    );
};
