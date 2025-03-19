import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from 'decentraland-ui2';
import { DownloadButton } from 'decentraland-ui2/dist/components/DownloadButton/DownloadButton';

import { Metadata, getLatestRelease, isEns, launchDesktopApp, queryData } from '../../utils';
import Image from '../../assets/dcl.webp';

import { Card } from '../Card/Card';

import styles from './Home.module.css';

export const Home: React.FC = memo(() => {
  const [searchParams] = useSearchParams();
  const position = searchParams.get('position') ?? '0,0';
  const realm = searchParams.get('realm') ?? 'main';
  const [metadata, setMetadata] = useState<Metadata | undefined>();
  const [link, setLink] = useState<string>();
  const [downloadOption, setShowDownloadOption] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setMetadata(await queryData(realm, position));
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };
    fetchMetadata();
  }, [position, realm]);

  useEffect(() => {
    async function getLatest() {
      const latestRelease = await getLatestRelease();
      setLink(latestRelease.browser_download_url);
    }
    getLatest();
  }, []);

  const handleOpenApp = useCallback(async () => {
    const appUrl = `decentraland://realm=${realm}&position=${position}`;
    const resp = await launchDesktopApp(appUrl);
    if (!resp) {
      setShowDownloadOption(true);
    }
  }, [realm, position]);

  const title = useMemo(() => (realm && isEns(realm) ? `World: ${realm}` : `Genesis City at ${position}`), [realm, position]);

  return (
    <Box className={styles.explorerWebsiteStart}>
      <Typography variant="h3" sx={{ padding: 10, textAlign: 'center' }}>
        {title}
      </Typography>
      <Card
        imageUrl={metadata?.image ?? Image}
        title={metadata?.title ?? ''}
        subtitle={metadata?.description ?? ''}
        buttonText="Jump in"
        onButtonClick={handleOpenApp}
      />
      <DownloadButton
        target="_blank"
        rel="noopener noreferrer"
        variant="h5"
        href={link}
        sx={{ color: 'white', mt: 5, visibility: downloadOption ? 'visible' : 'hidden' }}
      >
        Download Desktop Explorer
      </DownloadButton>
    </Box>
  );
});
