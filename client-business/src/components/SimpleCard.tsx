import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export const SimpleCard = ({from = 'from', to = 'to', phone = '89999999999'}: any) => {
  // console.log('From: ', from);
  // let from
  // let to
  // let phone
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Заявка
        </Typography>

        <Typography className={classes.pos} color='textSecondary'>
          {phone}
        </Typography>
        <Typography variant='body2' component='p'>
          {from}
          <br />
          {to}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Принять заявку</Button>
      </CardActions>
    </Card>
  )
}
