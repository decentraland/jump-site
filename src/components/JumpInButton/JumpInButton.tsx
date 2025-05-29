import { useCallback, useState, type FC } from 'react'
import { useAdvancedUserAgentData } from '@dcl/hooks'
import { Typography, ButtonOwnProps, Button } from 'decentraland-ui2'
import { Events, useAnalytics } from '../../hooks/useAnalytics'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { launchDesktopApp } from '../../utils'
import { CardData } from '../../utils/cardDataTransformers'
import { DownloadModal } from '../DownloadModal/DownloadModal'
import { MobileDisclaimerModal } from '../MobileDisclaimerModal/MobileDisclaimerModal'
import { JumpInIcon, JumpInIconButton } from './JumpInButton.styled'

const DEFAULT_POSITION = '0,0'
const DEFAULT_REALM = 'main'

interface JumpInButtonProps extends ButtonOwnProps {
  position: string
  realm?: string
  onlyIcon?: boolean
  sceneData?: CardData
}

export const JumpInButton: FC<JumpInButtonProps> = ({
  position,
  realm,
  sceneData,
  onlyIcon = false,
  size = 'large',
  children,
  ...props
}) => {
  const [, advancedUserAgent] = useAdvancedUserAgentData()
  const { track } = useAnalytics()
  const [downloadOption, setShowDownloadOption] = useState<boolean>(false)
  const [showMobileModal, setMobileModalOpen] = useState(false)
  const formatMessage = useFormatMessage()

  const osName = advancedUserAgent?.os?.name ?? 'unknown'
  const arch = advancedUserAgent?.cpu?.architecture?.toLowerCase() ?? 'unknown'
  const isMobile = !!advancedUserAgent?.mobile

  const handleClickJumpIn = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isMobile) {
        setMobileModalOpen(true)
        track(Events.CLICK_JUMP_IN_MOBILE, { osName, arch })
        return
      }

      const { target } = event
      const appUrl = new URL('decentraland://')

      if (realm && realm !== DEFAULT_REALM) {
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
    [realm, position, osName, arch, isMobile, track]
  )

  const handleCloseDownloadModal = useCallback(() => {
    track(Events.CLICK_DOWNLOAD_MODAL_CLOSE, { osName, arch })
    setShowDownloadOption(false)
  }, [osName, arch, track])

  const handleCloseMobileDisclaimerModal = useCallback(() => {
    track(Events.CLICK_MOBILE_DISCLAIMER_MODAL_CLOSE, { osName, arch })
    setMobileModalOpen(false)
  }, [osName, arch, track])

  return (
    <>
      {onlyIcon ? (
        <JumpInIconButton onClick={handleClickJumpIn} aria-label="Jump in to Decentraland" {...props}>
          <JumpInIcon iconSize="full" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.2111 11.065L14.534 6.39027C13.7002 5.55695 12.2971 6.14637 12.2971 7.32523V8.86994C12.2564 8.86994 12.2361 8.86994 12.1954 8.86994H7.75895C7.00654 8.86994 6.39648 9.45936 6.39648 10.2114V13.7683C6.39648 14.5203 7.00654 15.1301 7.75895 15.1301H12.1751C12.2158 15.1301 12.2361 15.1301 12.2768 15.1301V16.6748C12.2768 17.8536 13.7002 18.4431 14.5137 17.6097L19.1908 12.935C19.7195 12.4065 19.7195 11.5732 19.2111 11.065Z"
              fill="white"
            />
          </JumpInIcon>
        </JumpInIconButton>
      ) : (
        <Button variant="contained" size={size} onMouseDown={handleClickJumpIn} {...props}>
          <>
            <Typography
              variant="body1"
              sx={theme => ({
                fontSize: size === 'medium' ? 13 : 15,
                fontWeight: 600,
                marginRight: 1,
                [theme.breakpoints.down('xs')]: { fontSize: size === 'medium' ? 14 : 16 }
              })}
            >
              {children ?? formatMessage('components.jump_in_button.jump_in')}
            </Typography>
            <JumpInIcon iconSize={size} viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.25" y="0.75" width="22.5" height="22.5" rx="7.25" stroke="#FCFCFC" strokeOpacity="0.3" strokeWidth="1.5" />
              <path
                d="M19.2111 11.065L14.534 6.39027C13.7002 5.55695 12.2971 6.14637 12.2971 7.32523V8.86994C12.2564 8.86994 12.2361 8.86994 12.1954 8.86994H7.75895C7.00654 8.86994 6.39648 9.45936 6.39648 10.2114V13.7683C6.39648 14.5203 7.00654 15.1301 7.75895 15.1301H12.1751C12.2158 15.1301 12.2361 15.1301 12.2768 15.1301V16.6748C12.2768 17.8536 13.7002 18.4431 14.5137 17.6097L19.1908 12.935C19.7195 12.4065 19.7195 11.5732 19.2111 11.065Z"
                fill="white"
              />
            </JumpInIcon>
          </>
        </Button>
      )}
      <DownloadModal open={downloadOption} onClose={handleCloseDownloadModal} osName={osName} arch={arch} sceneData={sceneData} />
      <MobileDisclaimerModal open={showMobileModal} onClose={handleCloseMobileDisclaimerModal} />
    </>
  )
}
