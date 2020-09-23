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
  orderStatus: 'not created' | 'sended' | 'delevered' | 'accepted' | 'completed'  = 'not created'

  setUser(user: string) {
    this.username = user
  }

  setOnline() {
    this.connected = true
  }

  setOffline() {
    this.connected = false
  }

}

decorate(Store, {
  connected: observable,
  setUser: action,
  setOnline: action,
  setOffline: action,
})

export const appStore = new Store()
