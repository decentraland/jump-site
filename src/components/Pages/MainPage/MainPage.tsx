import { memo, useCallback, useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAdvancedUserAgentData } from '@dcl/hooks'
import { Box, Button, Typography } from 'decentraland-ui2'
import image from '../../../assets/dcl.webp'
import { Events, useAnalytics } from '../../../hooks/useAnalytics'
import { Metadata, isEns, launchDesktopApp, queryData } from '../../../utils'
import { Card } from '../../Card/Card'
import { DownloadButton } from '../../DownloadButton/DownloadButton'
import styles from './MainPage.module.css'

const DEFAULT_POSITION = '0,0'
const DEFAULT_REALM = 'main'

export const MainPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const [, advancedUserAgent] = useAdvancedUserAgentData()
  const { track } = useAnalytics()
  const [metadata, setMetadata] = useState<Metadata | undefined>()
  const [downloadOption, setShowDownloadOption] = useState<boolean>(false)

  const position = searchParams.get('position') ?? DEFAULT_POSITION
  const realm = searchParams.get('realm') ?? DEFAULT_REALM

  const osName = advancedUserAgent?.os?.name?.toLowerCase() ?? 'unknown'
  const arch = advancedUserAgent?.cpu?.architecture?.toLowerCase() ?? 'unknown'

  const title = useMemo(() => (realm && isEns(realm) ? `World: ${realm}` : `Genesis City at ${position}`), [realm, position])

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await queryData(realm, position)
        setMetadata(metadata)
      } catch (error) {
        console.error('Error fetching metadata:', error)
      }
    }
    fetchMetadata()
  }, [position, realm])

  const handleClickJumpIn = useCallback(async () => {
    const appUrl = new URL('decentraland://')

    if (realm !== DEFAULT_REALM) {
      appUrl.searchParams.set('realm', realm)
    }

    if (position !== DEFAULT_POSITION) {
      appUrl.searchParams.set('position', position)
    }

    track(Events.CLICK_JUMP_IN, { deepLink: appUrl.toString(), osName, arch })

    const resp = await launchDesktopApp(appUrl.toString())

    if (!resp) {
      setShowDownloadOption(true)
      track(Events.CLIENT_NOT_INSTALLED, { osName, arch })
    }
  }, [realm, position, osName, arch, track])

  return (
    <Box height="100vh" pt={12} display="flex" flexDirection="column" alignItems="center" className={styles.explorerWebsiteStart}>
      <Box mb={4}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        {metadata?.owner ? (
          <Typography variant="body1" sx={{ textAlign: 'center', fontSize: 30, fontWeight: 700 }}>
            Created by {metadata.owner}
          </Typography>
        ) : null}
      </Box>
      <Box mb={5}>
        <Card imageUrl={metadata?.image ?? image} title={metadata?.title ?? ''} subtitle={metadata?.description ?? ''} />
      </Box>
      <Box mb={4}>
        <Button variant="contained" size="large" className={styles.jumpInButton} onClick={handleClickJumpIn}>
          <Typography variant="body1" sx={{ fontSize: 30, fontWeight: 700 }}>
            Jump in
          </Typography>
        </Button>
      </Box>
      {downloadOption ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h4" sx={{ textAlign: 'center', textTransform: 'uppercase', fontSize: 30, fontWeight: 700 }}>
            Haven't downloaded decentraland yet? <br />
            Download now to jump in
          </Typography>
          <DownloadButton />
        </Box>
      ) : null}
    </Box>
  )
})
