import { memo, type FC } from 'react'
import { CircularProgress, Skeleton } from 'decentraland-ui2'
import { CardContainer, ImageContainer, Image, Content, Text, Title, Subtitle, LoadingContainer } from './Card.styled'

type CardProps = {
  imageUrl: string
  title: string
  subtitle: string
  isLoading?: boolean
}

export const Card: FC<CardProps> = memo(({ imageUrl, title, subtitle, isLoading = false }) => {
  return (
    <CardContainer>
      <ImageContainer>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress disableShrink />
          </LoadingContainer>
        ) : (
          <Image src={imageUrl} alt={title} />
        )}
      </ImageContainer>
      <Content>
        <Text>
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" sx={{ fontSize: 24, fontWeight: 700, marginBottom: '10px' }} />
              <Skeleton variant="text" animation="wave" sx={{ fontSize: 16, marginTop: '4px' }} />
            </>
          ) : (
            <>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </>
          )}
        </Text>
      </Content>
    </CardContainer>
  )
})
