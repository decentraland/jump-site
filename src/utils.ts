/**
 * KERNEL CODE :)
 * Thanks kernel
 */

export type Metadata = {
  description: string
  title: string
  image: string
}

export function isEns(str: string | undefined): str is `${string}.eth` {
  return !!str?.match(/^[a-zA-Z0-9.]+\.eth$/)?.length
}

export async function queryData(realm: string, position: string): Promise<Metadata | undefined> {
  const url = isEns(realm) ? `https://places.decentraland.zone/api/worlds?names=${realm.toLowerCase()}` : `https://places.decentraland.zone/api/places?positions=${position}`
  const resp = await fetch(url)
  const data: { data: Metadata[] } = await resp.json()
  return data.data[0]
}

export interface GithubReleaseResponse {
  browser_download_url: string;
  version: string;
}

export let latestRelease: GithubReleaseResponse

export async function getLatestRelease(): Promise<GithubReleaseResponse> {
  if (latestRelease) return latestRelease
  const resp = await fetch(`https://api.github.com/repos/decentraland/unity-explorer/releases/latest`);
  if (resp.status === 200) {
    const data = (await resp.json()) as { assets: Record<string, string>[]; name: string };
    const os = getOSName();
    const asset = data.assets.find((asset: Record<string, string>) => asset.name.includes(os.toLowerCase()));
    if (asset) {
      return latestRelease = {
        browser_download_url: asset.browser_download_url,
        version: data.name,
      }
    } else {
      throw new Error('No asset found for your platform');
    }
  }

  throw new Error('Failed to fetch latest release: ' + JSON.stringify(resp));
}
getLatestRelease()

type OSName = 'windows' | 'macos' | 'Unknown'

function getOSName(): OSName {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('win') > -1) {
    return 'windows'
  } else if (userAgent.indexOf('mac') > -1) {
    return 'macos'
  }

  return 'Unknown'
}
