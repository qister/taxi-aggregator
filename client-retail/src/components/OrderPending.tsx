import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { yellow } from '@material-ui/core/colors'

import { client } from '../Connections'
import Button from '@material-ui/core/Button'

const useStylesLoader = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
)

export const CircularIndeterminate = () => {
  const classes = useStylesLoader()

  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color='secondary' />
    </div>
  )
}

//========

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem',
      margin: '1rem',
      display: 'flex',
      flexDirection: 'column',
      animationDuration: '2s',
      animation: `$myEffect`,
    },
    container: {
      // display: 'flex',
      // flexDirection: 'column'
      
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 0,
      // justifyContent: 'center',
    },
    item: {
      flex: '1 0 auto',
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

export const PendingCard = () => {
  const [status, setStatus] = useState('ждем ответа')

  useEffect(() => {
    // client.onopen = () => {
    //   console.log('connected')
    // }
    client.onmessage = (message: any) => {
      console.log('message', message)

      // console.log('message data', message.data)

      const messageParsed = JSON.parse(message.data)
      console.log('message parsed', messageParsed);
      
      const dataFromServer: any = messageParsed.data
      console.log('got reply! ', dataFromServer)
      if (messageParsed.type === 'message') {
        setStatus(messageParsed.msg)
      }
    }

  }, [])
  
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Заявка оставлена в
          </Typography>
          <Typography component='h5' variant='h5'>
            {new Date().toLocaleTimeString()}
          </Typography>
        </CardContent>

        <div className={classes.details}>
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
              Куда
            </Typography>
            <Typography component='h5' variant='h5'>
              Москва
            </Typography>
          </CardContent>

          <CardContent className={classes.item}>
            <Typography variant='subtitle1' color='textSecondary'>
              Ваш телефон
            </Typography>
            <Typography component='h5' variant='h5'>
              +7 999 999-99-99
            </Typography>
          </CardContent>
        </div>
        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            Статус
          </Typography>
          <Typography component='h5' variant='h5'>
            {status}
          </Typography>
        </CardContent>
        <CardContent className={classes.item}>
          <Typography variant='subtitle1' color='textSecondary'>
            ⠀
          </Typography>

          <Button variant='outlined' size='small' color='primary'>
            отменить заявку
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}