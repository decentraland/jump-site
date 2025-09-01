import { memo, useCallback, type FC } from 'react'
import { DownloadButton as DCLDownloadButton } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton'
import { OperativeSystem } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton.types'
import { config as DCLConfig } from 'decentraland-ui2/dist/config'
import { Box } from 'decentraland-ui2'
import appleLogo from '../../assets/apple-logo.svg'
import windowsLogo from '../../assets/windows-logo.svg'
import { Events, useAnalytics } from '../../hooks/useAnalytics'
import { CardData } from '../../utils/cardDataTransformers'
import { eventHasEnded } from '../../utils/dateFormatter'
import { DownloadButtonIcon } from './DownloadButton.styled'

const DEFAULT_DOWNLOAD_URL = 'https://decentraland.org/download'

enum ARCH {
  ARM64 = 'arm64',
  AMD64 = 'x64'
}

const CDN_RELEASES = {
  Windows: { amd64: 'https://explorer-artifacts.decentraland.org/launcher-rust/Decentraland_installer.exe' },
  macOS: {
    amd64: 'https://explorer-artifacts.decentraland.org/launcher/dcl/Decentraland%20Outdated-mac-x64.dmg',
    arm64: 'https://explorer-artifacts.decentraland.org/launcher-rust/Decentraland_installer.dmg'
  }
}

const DOWNLOAD_URLS = {
  [OperativeSystem.MACOS]: {
    ...CDN_RELEASES?.macOS,
    icon: appleLogo,
    alt: 'Apple Logo'
  },
  [OperativeSystem.WINDOWS]: {
    ...CDN_RELEASES?.Windows,
    icon: windowsLogo,
    alt: 'Windows Logo'
  }
}

export const DownloadButton: FC<{ osName: string | undefined; arch: string | undefined; sceneData?: CardData }> = memo(
  ({ osName = 'unknown', arch = 'unknown', sceneData }) => {
    const { track } = useAnalytics()

    const getDownloadUrl = useCallback(
      (os: OperativeSystem) => {
        const config = DOWNLOAD_URLS[os]
        const defaultDownloadUrl = `${DEFAULT_DOWNLOAD_URL}/?os=${os}`

        if (os === OperativeSystem.MACOS && arch === ARCH.ARM64) {
          return config.amd64 ?? defaultDownloadUrl
        }
        return config.amd64 ?? defaultDownloadUrl
      },
      [arch]
    )

    const handleClickDownload = useCallback(
      (os: OperativeSystem) => {
        const params: Record<string, string | boolean> = { osName: os, arch, url: getDownloadUrl(os) }
        if (sceneData) {
          if (sceneData.type === 'place') {
            params.fromPlace = true
          } else if (sceneData.type === 'event') {
            params.fromEvent = true
            params.futureEvent = !sceneData.live && !eventHasEnded(sceneData)
          }
          params.position = sceneData.position
        }

        track(Events.CLICK_DOWNLOAD, params)
        window.open(DCLConfig.get('DOWNLOAD_SUCCESS_URL'), '_blank', 'noopener')
      },
      [arch, track]
    )

    const handleDownloadRedirect = useCallback((_url: string) => {}, [])

    const renderButton = useCallback(
      (os: OperativeSystem) => {
        const config = DOWNLOAD_URLS[os]
        return (
          <DCLDownloadButton
            key={os}
            label={`Download for ${os}`}
            endIcon={<DownloadButtonIcon src={config.icon} alt={config.alt} />}
            href={getDownloadUrl(os)}
            onClick={() => handleClickDownload(os)}
            onRedirect={handleDownloadRedirect}
          />
        )
      },
      [handleClickDownload, getDownloadUrl]
    )

    if (osName === 'unknown') {
      return (
        <Box display="flex" gap={2} mt={2}>
          {renderButton(OperativeSystem.MACOS)}
          {renderButton(OperativeSystem.WINDOWS)}
        </Box>
      )
    }

    return renderButton(osName as OperativeSystem)
  }
)
