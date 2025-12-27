import clsx from 'clsx';
import styles from './Skeleton.module.scss';
import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ width, height, variant = 'text', className, style, ...props }: SkeletonProps) => {
    const computedStyle = {
        width,
        height,
        borderRadius: variant === 'circular' ? '50%' : undefined,
        ...style,
    };

    return (
        <div
            className={clsx(styles.skeleton, className)}
            style={computedStyle}
            {...props}
        />
    );
};
