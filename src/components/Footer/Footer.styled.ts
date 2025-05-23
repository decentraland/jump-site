import { Box, Button, Link, Typography, styled, useTheme } from 'decentraland-ui2'

const FooterContainer = styled('footer')(() => {
  const theme = useTheme()
  return {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    zIndex: 5,
    height: '475px',
    position: 'relative',
    paddingTop: '96px',
    paddingLeft: '160px',
    paddingRight: '160px',
    [theme.breakpoints.down('xl')]: {
      paddingLeft: '80px',
      paddingRight: '80px'
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '54px',
      paddingRight: '54'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: '8px',
      paddingRight: '8px',
      height: '630px'
    }
  }
})

const LinksContainer = styled(Box)(() => {
  const theme = useTheme()
  return {
    display: 'flex',
    width: '710px',
    justifyContent: 'space-around',

    [theme.breakpoints.down('xs')]: {
      paddingLeft: '24px',
      paddingRight: '24px',
      width: '100%'
    }
  }
})

const LinksWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
})

const LinksTitle = styled(Typography)(() => {
  const theme = useTheme()
  return {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    marginBottom: '16px',
    marginLeft: '5px',
    fontWeight: 500
  }
})

const IconButton = styled(Button)(() => {
  const theme = useTheme()
  return {
    cursor: 'pointer',
    justifyContent: 'flex-start',
    marginBottom: '4px',
    ['&.MuiButton-sizeMedium.MuiButton-textSecondary:not(.Mui-disabled):not(.Mui-focusVisible):not(:hover)']: {
      color: theme.palette.text.primary,
      textTransform: 'capitalize',
      ['& .MuiButton-startIcon svg.MuiSvgIcon-root']: {
        color: theme.palette.text.secondary
      }
    },
    ['&.MuiButton-sizeMedium.MuiButton-textSecondary:not(.Mui-disabled):not(.Mui-focusVisible):hover']: {
      textTransform: 'capitalize'
    },
    ['&:hover']: {
      backgroundColor: 'transparent'
    },
    [theme.breakpoints.down('xs')]: {
      ['&.MuiButton-sizeMedium.MuiButton-textSecondary:not(.Mui-disabled):not(.Mui-focusVisible):not(:hover)']: {
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '32px',
        ['& .MuiButton-startIcon svg.MuiSvgIcon-root']: {
          fontSize: '24px'
        }
      }
    }
  }
})

const SubscribeContainer = styled(Box)(() => {
  const theme = useTheme()
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '470px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '16px',
      paddingRight: '16px',
      alignItems: 'center'
    }
  }
})

const SubscribeSubtitle = styled(Typography)(() => {
  const theme = useTheme()
  return {
    color: theme.palette.text.disabled,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '8px',
      paddingRight: '8px'
    }
  }
})

const SubscribeTitle = styled(Typography)(() => {
  const theme = useTheme()
  return {
    color: '#fff',
    marginBottom: '16px',
    fontFamily: 'DecentralandHero',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '8px',
      paddingRight: '8px',
      marginBottom: '24px'
    }
  }
})

const SubscriptionBeehiiv = styled('iframe')({
  width: '100%',
  border: 'none',
  height: '125px'
})

const SocialContainer = styled(Box)(() => {
  const theme = useTheme()
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
})

const SocialIconWrapper = styled(Box)({
  display: 'flex',
  width: '80%',
  justifyContent: 'space-between'
})

const SocialIconBox = styled(Link)({
  cursor: 'pointer',
  fontSize: '32px',
  color: '#fff',
  ['&:hover']: {
    color: '#fff'
  }
})

export {
  FooterContainer,
  LinksContainer,
  LinksWrapper,
  LinksTitle,
  IconButton,
  SubscribeContainer,
  SubscribeSubtitle,
  SubscribeTitle,
  SubscriptionBeehiiv,
  SocialContainer,
  SocialIconWrapper,
  SocialIconBox
}
