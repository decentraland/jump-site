import { memo, useCallback, type FC } from 'react'
import { DownloadButton as DCLDownloadButton } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton'
import { OperativeSystem } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton.types'
import { CDNSource, getCDNRelease } from 'decentraland-ui2/dist/modules/cdnReleases'
import { Box } from 'decentraland-ui2'
import appleLogo from '../../assets/apple-logo.svg'
import windowsLogo from '../../assets/windows-logo.svg'
import { Events, useAnalytics } from '../../hooks/useAnalytics'
import { DownloadButtonIcon } from './DownloadButton.styled'

const DEFAULT_DOWNLOAD_URL = 'https://decentraland.org/download'

enum ARCH {
  ARM64 = 'arm64',
  AMD64 = 'x64'
}

const CDN_RELEASES = getCDNRelease(CDNSource.LAUNCHER)

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

export const DownloadButton: FC<{ osName: string | undefined; arch: string | undefined }> = memo(
  ({ osName = 'unknown', arch = 'unknown' }) => {
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
        track(Events.CLICK_DOWNLOAD, { osName: os, arch, url: getDownloadUrl(os) })
      },
      [arch, track]
    )

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
