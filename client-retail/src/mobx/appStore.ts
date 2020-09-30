import { action, decorate, observable } from 'mobx'

export interface IOrder {
  date: Date
  from: string
  id: number
  to: string
  phone: string
}

class Store {
  username: string = 'user'
  connected: boolean = false
  orderStatus: 'not created' | 'sended' | 'delivered' | 'accepted' | 'completed'  = 'not created'
  error: Error | null = null

  setUser(user: string) {
    this.username = user
  }

  setOnline() {
    this.connected = true
  }

  setOffline() {
    this.connected = false
  }

  setOrderStatus(orderStatus: 'not created' | 'sended' | 'delivered' | 'accepted' | 'completed') {
    this.orderStatus = orderStatus
  }

  setError(error: Error | null) {
    this.error = error
  }

}

decorate(Store, {
  connected: observable,
  username: observable,
  orderStatus: observable,
  error: observable,

  setUser: action,
  setOnline: action,
  setOffline: action,
  setOrderStatus: action,
  setError: action
})

export const appStore = new Store()
