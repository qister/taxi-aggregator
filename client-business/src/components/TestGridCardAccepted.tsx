import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { yellow } from '@material-ui/core/colors'

import { client } from '../Connections'
import { Button, Grid } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '1rem',
      margin: '1rem',
      flexGrow: 1,
      animationDuration: '2s',
      animation: `$myEffect`,
      'background-color': 'Aquamarine',
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

export const TestGridCardAccepted = ({ date }: any) => {
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
      {/* <div className={classes.details}> */}
      <Grid container direction='row'>

        <Grid item >

        <CardContent className={classes.item}>

          <Typography component='h6' variant='body2'>

            {new Date(date).toLocaleTimeString()}
          </Typography>
        </CardContent>
        </Grid>

        <Grid item >
          <CardContent className={classes.item}>
            <Typography component='h6' variant='body2'>
              Краснознаменск →
            </Typography>
            <Typography component='h6' variant='body2'>
              Москва
            </Typography>
          </CardContent>
        </Grid>

        {/* <Grid item >
          <CardContent className={classes.item}>

            <Typography component='h6' variant='h6'>
              →
            </Typography>
          </CardContent>
        </Grid> */}

        {/* <Grid item >
          <CardContent className={classes.item}>
            <Typography component='h6' variant='h6'>
              Москва
            </Typography>
          </CardContent>
        </Grid> */}

        <Grid item >
          <CardContent className={classes.item}>
            <Typography component='h6' variant='body2'>
              +7 999 999-99-99
            </Typography>
          </CardContent>
        </Grid>


        <Grid item >

        </Grid>
        <CardContent className={classes.item}>
          <Button size='small' variant='outlined'>
            Принять
          </Button>
        </CardContent>
        {/* <Grid item >
          <CardContent className={classes.item}>
            <IconButton size='small' onClick={acceptOrder}>
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
