import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Link, Typography } from 'decentraland-ui2'

import './Home.css'
import Card from './Card'
import { Metadata, getLatestRelease, isEns, queryData } from '../utils'



function Home() {
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position') ?? '0,0'
  const realm = searchParams.get('realm') ?? 'main'
  const [metadata, setMetadata] = React.useState<Metadata | undefined>()
  const [link, setLink] = React.useState<string>()
  const [downloadOption, setShowDownloadOption] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setMetadata(await queryData(realm, position))
      } catch (error) {
        console.error('Error fetching metadata:', error)
      }
    }
    fetchMetadata()
  }, [position, realm])

  React.useEffect(() => {
    async function getLatest() {
      const latestRelease = await getLatestRelease()
      setLink(latestRelease.browser_download_url)
    }
    getLatest()
  }, [])


  const handleOpenApp = () => {
    const appUrl = `decentraland://`;

    // Attempt to open the Decentraland app
    window.location.href = appUrl;

    // Set a timeout to check if the app opened
    setTimeout(() => {
      // If the page is still here after a short delay, show download option
      setShowDownloadOption(true);
    }, 1500);
  };

  const title = (realm && isEns(realm)) ? `World: ${realm}` : `Genesis City at ${position}`

  return (
    <Box className="explorer-website-start">
      <Typography variant='h3' sx={{ padding: 10, marginTop: -30, textAlign: 'center'}}>
        {title}
      </Typography>
      <Card
        imageUrl={metadata?.image ?? ''}
        title={metadata?.title ?? "Unkown title"}
        subtitle={metadata?.description ?? "Unkown description"}
        buttonText="Jump in"
        onButtonClick={handleOpenApp}
      />
      <Link target="_blank" rel="noopener noreferrer"  variant="h5" href={link} sx={{ color: 'white', mt: 5, visibility: downloadOption ? 'visible' : 'hidden' }}>
        Download Desktop Explorer
      </Link>
    </Box>
  )
}

export default Home



