import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { yellow } from '@material-ui/core/colors'

import {client} from '../Connections'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem',
      margin: '1rem',
      // display: 'flex',
      animationDuration: '2s',
      animation: `$myEffect`,
    },
    details: {
      display: 'flex',
      
      // flexDirection: 'row'
      // alignItems: 'flex-start',
      justifyContent: 'space-around',
    },
    item: {
      // flex: '0 0 auto',
      flexGrow: 0,
      flexBasis: 'auto'

    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      // paddingLeft: theme.spacing(1),
      // paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    '@keyframes myEffect': {
      '0%': {
        // opacity: 0,
        'background-color': 'yellow',
      },
      '100%': {
        // opacity: 1,
        'background-color': 'white',
      },
    },
  }),
)


export const TestCard = ({ date }: any) => {
  const classes = useStyles()

  const acceptOrder = () => {
    client.send(
      JSON.stringify({
        type: 'message',
        msg: 'order accepted',
      
      }),
    )
  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            ⠀
          </Typography>
          <Typography component='h5' variant='h5'>
            {new Date(date).toLocaleTimeString()}
          </Typography>
        </CardContent>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Откуда
          </Typography>
          <Typography component='h5' variant='h5'>
            Краснознаменск
          </Typography>
        </CardContent>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            ⠀
          </Typography>
          <Typography component='h5' variant='h5'>
            →
          </Typography>
        </CardContent>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Куда
          </Typography>
          <Typography component='h5' variant='h5'>
            Москва
          </Typography>
        </CardContent>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Телефон
          </Typography>
          <Typography component='h5' variant='h5'>
            +7 999 999-99-99
          </Typography>
        </CardContent>

        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Действия
          </Typography>

          <IconButton size='small' onClick={acceptOrder}>
            <DoneIcon />
          </IconButton>
          <IconButton size='small'>
            <NotInterestedIcon />
          </IconButton>
        </CardContent>
      </div>
    </Card>
  )
}
