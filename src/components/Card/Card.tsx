import React from 'react';

import styles from './Card.module.css';

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export const Card: React.FC<CardProps> = React.memo(({ imageUrl, title, subtitle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
});
