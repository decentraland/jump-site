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
      paddingRight: '54px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '32px',
      paddingBottom: '32px',
      height: 'auto',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)'
    }
  }
})

const LinksContainer = styled(Box)(() => {
  const theme = useTheme()
  return {
    display: 'flex',
    width: '710px',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: 0,
      justifyContent: 'space-between',
      gap: '32px',
      marginBottom: '120px'
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
    [theme.breakpoints.down('sm')]: {
      ['&.MuiButton-sizeMedium.MuiButton-textSecondary:not(.Mui-disabled):not(.Mui-focusVisible):not(:hover)']: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        padding: '4px 8px',
        minHeight: 'auto',
        ['& .MuiButton-startIcon svg.MuiSvgIcon-root']: {
          fontSize: '16px'
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingBottom: '24px',
      alignItems: 'center',
      textAlign: 'center'
    }
  }
})

const SubscribeSubtitle = styled(Typography)(() => {
  const theme = useTheme()
  return {
    color: theme.palette.text.disabled,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      marginBottom: '16px'
    }
  }
})

const SubscriptionBeehiiv = styled('iframe')(() => {
  const theme = useTheme()
  return {
    width: '100%',
    border: 'none',
    height: '125px',
    [theme.breakpoints.down('sm')]: {
      height: '55px'
    }
  }
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
