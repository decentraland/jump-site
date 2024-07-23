import React from 'react';
import styles from './Card.module.css';
import { Button } from 'decentraland-ui2';

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, buttonText, onButtonClick }) => {
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
        <Button variant="contained" className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Card;