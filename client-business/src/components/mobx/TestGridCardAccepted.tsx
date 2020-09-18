import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { yellow } from '@material-ui/core/colors'

import { Button, Grid } from '@material-ui/core'
import { IOrder } from '../../mobx/ordersStore'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem',
      margin: '1rem',
      flexGrow: 1,
      animationDuration: '2s',
      animationName: `$myEffect`,
      animationFillMode: 'both'
    },
    details: {
      // display: 'flex',
      // alignItems: 'flex-start',
      // justifyContent: 'center',
    },
    item: {
      // flex: '0 0 auto',
    },

    '@keyframes myEffect': {
      '0%': {
        // opacity: 0,
        'background-color': 'GreenYellow',
      },
      '100%': {
        // opacity: 1,
        'background-color': 'Aquamarine',
      },
    },
  }),
)

export const TestGridCardAccepted = ({ from, to, phone, date, id }: IOrder) => {
  const classes = useStyles()

  // const addOrderToAcceptedList = () => {
  //   client.send(
  //     JSON.stringify({
  //       type: 'message',
  //       msg: 'order accepted',
  //     }),
  //   )
  // }
  
  const [timeDifference, setTimeDifference] = useState('Времени прошло')

  useEffect(() => {
    setInterval(() => {
      const now = new Date()
      const timeOrderAccepted = new Date(date)

      const diff = new Date(
        now.getTime() - timeOrderAccepted.getTime(),
      ).toLocaleTimeString('ru-Ru', { timeZone: 'UTC' })
      return setTimeDifference(diff)
    }, 1000)
  }, [])

  // const startDate = new Date(date)
  // // Do your operations
  // const endDate = new Date()
  // const seconds = (endDate.getTime() - startDate.getTime()) / 1000

  // console.log(
  //   'Datediff: ',
  //   new Date(Date.now() - +new Date(date)).toLocaleTimeString(),
  // )

  return (
    <Card className={classes.root}>
      {/* <div className={classes.details}> */}
      <Grid container direction='row'>
        <Grid item>
          <CardContent className={classes.item}>
            <Typography component='h6' variant='body2'>
              {timeDifference}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item>
          <CardContent className={classes.item}>
            <Typography component='h6' variant='body2'>
              {from} →
            </Typography>
            <Typography component='h6' variant='body2'>
              {to}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item>
          <CardContent className={classes.item}>
            <Typography component='h6' variant='body2'>
              {phone}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item></Grid>
        <CardContent className={classes.item}>
          <Button size='small' variant='outlined'>
            id: {id}
          </Button>
        </CardContent>
        {/* <Grid item >
          <CardContent className={classes.item}>
            <IconButton size='small' onClick={addOrderToAcceptedList}>
              <DoneIcon />
            </IconButton>
            <IconButton size='small'>
              <NotInterestedIcon />
            </IconButton>
          </CardContent>
        </Grid> */}
      </Grid>
      {/* </div> */}
    </Card>
  )
}
