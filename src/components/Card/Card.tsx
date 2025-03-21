import { memo, type FC } from 'react'
import { CircularProgress, Skeleton } from 'decentraland-ui2'
import styles from './Card.module.css'

interface CardProps {
  imageUrl: string
  title: string
  subtitle: string
  isLoading?: boolean
}

export const Card: FC<CardProps> = memo(({ imageUrl, title, subtitle, isLoading = false }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          <img src={imageUrl} alt={title} className={styles.image} />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" sx={{ fontSize: 24, fontWeight: 700, marginBottom: '10px' }} />
              <Skeleton variant="text" animation="wave" sx={{ fontSize: 16, marginTop: '4px' }} />
            </>
          ) : (
            <>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
})
