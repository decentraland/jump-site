import { memo, useCallback, type FC } from 'react'
import { useAdvancedUserAgentData } from '@dcl/hooks'
import { DownloadButton as DCLDownloadButton } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton'
import { Box } from 'decentraland-ui2'
import appleLogo from '../../assets/apple-logo.svg'
import windowsLogo from '../../assets/windows-logo.svg'
import { Events, useAnalytics } from '../../hooks/useAnalytics'
import styles from './DownloadButton.module.css'

const DOWNLOAD_URL_BASE = 'https://explorer-artifacts.decentraland.org/launcher/dcl/'

enum OS {
  MACOS = 'macos',
  WINDOWS = 'windows'
}

enum ARCH {
  ARM64 = 'arm64',
  X64 = 'x64'
}

const DOWNLOAD_URLS = {
  [OS.MACOS]: {
    arm64: `${DOWNLOAD_URL_BASE}Decentraland%20Launcher-mac-arm64.dmg`,
    x64: `${DOWNLOAD_URL_BASE}Decentraland%20Launcher-mac-x64.dmg`,
    icon: appleLogo,
    alt: 'Apple Logo'
  },
  [OS.WINDOWS]: {
    x64: `${DOWNLOAD_URL_BASE}Decentraland%20Launcher-win-x64.exe`,
    icon: windowsLogo,
    alt: 'Windows Logo'
  }
}

export const DownloadButton: FC = memo(() => {
  const [, advancedUserAgent] = useAdvancedUserAgentData()
  const { track } = useAnalytics()

  const osName = advancedUserAgent?.os?.name?.toLowerCase() ?? 'unknown'
  const arch = advancedUserAgent?.cpu?.architecture?.toLowerCase() ?? 'unknown'

  const handleClickDownload = useCallback(() => {
    track(Events.CLICK_DOWNLOAD, { osName, arch })
  }, [osName, arch, track])

  const getDownloadUrl = useCallback(
    (os: OS) => {
      const config = DOWNLOAD_URLS[os]
      if (osName === OS.MACOS && arch === ARCH.ARM64) {
        return (config as (typeof DOWNLOAD_URLS)[OS.MACOS]).arm64
      }
      return config.x64
    },
    [osName, arch]
  )

  const renderButton = useCallback(
    (os: OS) => {
      const config = DOWNLOAD_URLS[os]
      return (
        <DCLDownloadButton
          key={os}
          label={`Download for ${os}`}
          endIcon={<img src={config.icon} alt={config.alt} className={styles.downloadButtonIcon} />}
          href={getDownloadUrl(os)}
          onClick={handleClickDownload}
        />
      )
    },
    [handleClickDownload, getDownloadUrl]
  )

  if (osName === 'unknown') {
    return (
      <Box display="flex" gap={2} mt={2}>
        {renderButton(OS.MACOS)}
        {renderButton(OS.WINDOWS)}
      </Box>
    )
  }

  return renderButton(osName as OS)
})
