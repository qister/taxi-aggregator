import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { client } from '../Connections'
import { useHttp } from '../hooks/http.hook'

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Cargregate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const SearchForm = () => {
  const { request } = useHttp()

  interface IForm {
    from: string
    to: string
    phone: string
    date?: Date | string
  }

  const [form, setForm] = useState<IForm>({
    from: '',
    to: '',
    phone: '',
  })

  useEffect(() => {
    client.onopen = () => {
      console.log('connected')
    }
    // client.onmessage = (message) => {
    //   console.log('message', message)
    //   const dataFromServer: any = message.data
    //   console.log('got reply! ', dataFromServer)
    //   if (dataFromServer.type === 'message') {
    //     setMessages((prev: any) => [
    //       ...prev,
    //       dataFromServer,
    //       {
    //         msg: dataFromServer.msg,
    //         user: dataFromServer.user,
    //       },
    //     ])
    //   }
    // }
  }, [])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {

    event.preventDefault()

    const data = await request(
      '/api/order/new',
      'POST',
      { ...form, date: new Date },
      { 'Content-Type': 'application/json' },
    )
    console.log('Response: ', data)

    // setForm({ ...form, [event.target.name]: event.target.value })

    // for( let i = 0; i < 1; i++) {
    //   setTimeout( () => {
    //     client.send(
    //       JSON.stringify({
    //         type: 'message',
    //         data: {from, to, phone, date: new Date}
    //       }),
    //     )
    //   }, Math.random()*i*2000)
    // }

    setForm({
      from: '',
      to: '',
      phone: '',
    })
  }

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalTaxiIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Вызвать такси
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='from'
            label='Откуда'
            name='from'
            autoFocus
            onChange={changeHandler}
            value={form.from}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='to'
            label='Куда'
            name='to'
            onChange={changeHandler}
            value={form.to}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='phone'
            label='Ваш телефон'
            type='phone'
            id='phone'
            autoComplete='phone'
            onChange={changeHandler}
            value={form.phone}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            size='large'
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleClick}
          >
            Заказать
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
