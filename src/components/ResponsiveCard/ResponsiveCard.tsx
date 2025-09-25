import { memo, type FC, type ReactNode } from 'react'
import { useMobileMediaQuery } from 'decentraland-ui2'
import { type CardData } from '../../utils/cardDataTransformers'
import { type Creator } from '../../utils/peerApi'
import { Card } from '../Card'
import { MobileCard } from '../MobileCard'

type ResponsiveCardProps = {
  data: CardData
  isLoading?: boolean
  children?: ReactNode
  creator?: Creator
}

export const ResponsiveCard: FC<ResponsiveCardProps> = memo(({ data, isLoading = false, children, creator }) => {
  const isMobile = useMobileMediaQuery()

  return isMobile ? (
    <MobileCard data={data} isLoading={isLoading} creator={creator}>
      {children}
    </MobileCard>
  ) : (
    <Card data={data} isLoading={isLoading} creator={creator}>
      {children}
    </Card>
  )
})
