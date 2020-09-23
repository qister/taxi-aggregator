import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainContainer } from './components/MainContainer'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <MainContainer />
        </Route>
        <Route path='/accepted'>
          <div>Заявка принята</div>
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/'>
        <p>Зарегистрируйтесь пожалуйста</p>
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
