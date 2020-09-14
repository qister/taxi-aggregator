import React, { useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import { CardList } from './CardList'
import { CardListAccepted } from './CardListAccepted'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
)

export const MainList = (props: any) => {

  // console.log('MainList Props: ', props);
  

  // useEffect(() => {
  //   const wsConnect = () => {
  //     const client = new W3CWebSocket('ws://localhost:8001')

  //     client.onopen = () => {
  //       console.log('connected')
  //     }

  //     client.onmessage = (message: any) => {
  //       // console.log('message', message)

  //       // console.log('message data', message.data)

  //       const messageParsed = JSON.parse(message.data)
  //       const dataFromServer: any = messageParsed.data
  //       console.log('got reply! ', dataFromServer)
  //       if (messageParsed.type === 'message') {
  //         props.addOrderToPendingList(dataFromServer)
  //       }
  //     }
  //     client.onclose = function (e) {
  //       console.log(
  //         'Socket is closed. Reconnect will be attempted in 1 second.',
  //         e.reason,
  //       )
  //       setTimeout(function () {
  //         wsConnect()
  //       }, 1000)
  //     }

  //     client.onerror = function (err) {
  //       console.error(
  //         'Socket encountered error: ',
  //         err.message,
  //         'Closing socket',
  //       )
  //       client.close()
  //     }
  //   }

  //   wsConnect()

  // }, [])


  const classes = useStyles()

  function FormRow() {
    return (
      <React.Fragment>

        <Grid item xs={6}>
          <CardList />
        </Grid>

        <Grid item xs={6}>
          <CardListAccepted/>
        </Grid>
        
      </React.Fragment>
    )
  }

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
