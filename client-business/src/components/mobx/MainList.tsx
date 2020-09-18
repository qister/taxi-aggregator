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

export const MainList = () => {

  const classes = useStyles()

  const FormRow = () => {
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
