import React, { useEffect, useState } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles,
} from '@material-ui/core/styles'

// const StyledBadge = withStyles((theme: Theme) =>
//   createStyles({
//     badge: {
//       backgroundColor: '#44b700',
//       color: '#44b700',
//       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//       '&::after': {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         borderRadius: '50%',
//         animation: '$ripple 1.2s infinite ease-in-out',
//         border: '1px solid currentColor',
//         content: '""',
//       },
//     },
//     '@keyframes ripple': {
//       '0%': {
//         transform: 'scale(.8)',
//         opacity: 1,
//       },
//       '100%': {
//         transform: 'scale(2.4)',
//         opacity: 0,
//       },
//     },
//   }),
// )(Badge)

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//   }),
// )

export const BadgeAvatars = ({ connected }: any) => {
  const [status, setStatus] = useState('D')
  const [color, setColor] = useState('')
  const [animation, setAnimation] = useState('none')

  useEffect(() => {
    if (connected) {
      setStatus('C')
      setColor('#44b700')
      setAnimation('none')
    } else {
      setStatus('D')
      setColor('#f44336')
      setAnimation('$ripple 1.2s infinite ease-in-out')
    }
  }, [connected])

  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: color,
        color: color,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: animation,
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
    }),
  )(Badge)

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }),
  )

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant='dot'
      >
        <Avatar
          alt='Username'
          // src='/static/images/avatar/1.jpg'
        />
      </StyledBadge>
    </div>
  )
}
