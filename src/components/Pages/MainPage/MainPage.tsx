import { memo, useCallback, useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAdvancedUserAgentData } from '@dcl/hooks'
import { Box, Button, Typography } from 'decentraland-ui2'
import image from '../../../assets/dcl.webp'
import { Events, useAnalytics } from '../../../hooks/useAnalytics'
import { Metadata, isEns, launchDesktopApp, queryData } from '../../../utils'
import { Card } from '../../Card/Card'
import { DownloadModal } from '../../DownloadModal/DownloadModal'
import { MobileDisclaimerModal } from '../../MobileDisclaimerModal/MobileDisclaimerModal'
import { MainPageContainer } from './MainPage.styled'

const DEFAULT_POSITION = '0,0'
const DEFAULT_REALM = 'main'

export const MainPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const [, advancedUserAgent] = useAdvancedUserAgentData()
  const { track } = useAnalytics()
  const [metadata, setMetadata] = useState<Metadata | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [downloadOption, setShowDownloadOption] = useState<boolean>(false)
  const [showMobileModal, setMobileModalOpen] = useState(false)

  const position = searchParams.get('position') ?? DEFAULT_POSITION
  const realm = searchParams.get('realm') ?? DEFAULT_REALM

  const osName = advancedUserAgent?.os?.name ?? 'unknown'
  const arch = advancedUserAgent?.cpu?.architecture?.toLowerCase() ?? 'unknown'
  const isMobile = !!advancedUserAgent?.mobile

  const title = useMemo(() => (realm && isEns(realm) ? `World: ${realm}` : `Genesis City at ${position}`), [realm, position])

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true)
      try {
        const metadata = await queryData(realm, position)
        setMetadata(metadata)
      } catch (error) {
        console.error('Error fetching metadata:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMetadata()
  }, [position, realm])

  const handleClickJumpIn = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isMobile) {
        setMobileModalOpen(true)
        track(Events.CLICK_JUMP_IN_MOBILE, { osName, arch })
        return
      }

      const { target } = event
      const appUrl = new URL('decentraland://')

      if (realm !== DEFAULT_REALM) {
        appUrl.searchParams.set('realm', realm)
      }

      if (position !== DEFAULT_POSITION) {
        appUrl.searchParams.set('position', position)
      }

      track(Events.CLICK_JUMP_IN, { deepLink: appUrl.toString(), osName, arch })

      const resp = await launchDesktopApp(target, appUrl.toString())

      if (!resp) {
        setShowDownloadOption(true)
        track(Events.CLIENT_NOT_INSTALLED, { osName, arch })
      }
    },
    [realm, position, osName, arch, isMobile, track, setMobileModalOpen]
  )

  const handleCloseDownloadModal = useCallback(() => {
    track(Events.CLICK_DOWNLOAD_MODAL_CLOSE, { osName, arch })
    setShowDownloadOption(false)
  }, [osName, arch, setShowDownloadOption, track])

  const handleCloseMobileDisclaimerModal = useCallback(() => {
    track(Events.CLICK_MOBILE_DISCLAIMER_MODAL_CLOSE, { osName, arch })
    setMobileModalOpen(false)
  }, [osName, arch, setMobileModalOpen, track])

  return (
    <MainPageContainer>
      <Box mb={4}>
        <Typography
          variant="h3"
          align="center"
          sx={theme => ({
            [theme.breakpoints.down('xs')]: { fontSize: 36 }
          })}
        >
          {title}
        </Typography>
        {metadata?.owner && !isLoading ? (
          <Typography
            variant="body1"
            align="center"
            sx={theme => ({ fontSize: 36, fontWeight: 700, [theme.breakpoints.down('xs')]: { fontSize: 28 } })}
          >
            Created by {metadata.owner}
          </Typography>
        ) : null}
      </Box>
      <Box mb={5}>
        <Card
          isLoading={isLoading}
          imageUrl={metadata?.image ?? image}
          title={metadata?.title ?? ''}
          subtitle={metadata?.description ?? ''}
        />
      </Box>
      <Box mb={4}>
        <Button
          variant="contained"
          size="large"
          onMouseDown={handleClickJumpIn}
          sx={theme => ({ width: 300, height: 65, [theme.breakpoints.down('xs')]: { width: 200 } })}
        >
          <Typography variant="body1" sx={theme => ({ fontSize: 30, fontWeight: 700, [theme.breakpoints.down('xs')]: { fontSize: 20 } })}>
            Jump in
          </Typography>
        </Button>
      </Box>
      <DownloadModal open={downloadOption} onClose={handleCloseDownloadModal} osName={osName} arch={arch} />
      <MobileDisclaimerModal open={showMobileModal} onClose={handleCloseMobileDisclaimerModal} />
    </MainPageContainer>
  )
})
