import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainContainer } from './components/MainContainer'
import { PendingCard } from './components/OrderPending'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <MainContainer />
        </Route>
        <Route path='/accepted'>
          <PendingCard/>
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
