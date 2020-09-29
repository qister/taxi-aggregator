import { action, decorate, observable } from 'mobx'
import { useHttp } from '../hooks/http.hook'
import axios from 'axios'

export interface IOrder {
  date: Date
  from: string
  id: number
  to: string
  phone: string
}

class Store {
  pendingOrders: Array<IOrder> = []
  acceptedOrders: Array<IOrder> = []

  addToPending(order: IOrder) {
    this.pendingOrders.push(order)
  }

  addToAccepted(order: IOrder) {
    this.acceptedOrders.push(order)
  }

  deleteFromPending(order: IOrder) {
    this.pendingOrders = this.pendingOrders.filter((item) => {
      return item.id !== order.id
    })
  }

  deleteFromAccepted(order: IOrder) {
    this.acceptedOrders = this.acceptedOrders.filter((item) => {
      console.log('item to delete from accepted: ', item)
      return item.id !== order.id
    })
  }

  async sendOrderAccepted(order: IOrder) {
    const data = await axios.post(
      '/api/order/accept',
      JSON.stringify({ id: order.id, user: 'taxopark' }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Data: ', data)
  }

  async acceptOrder(order: IOrder) {
    try {
      await this.sendOrderAccepted(order)
      this.addToAccepted(order)
      this.deleteFromPending(order)
    } catch (e) {
      console.log('Move error: ', e.message)
    }
  }

  async sendOrderCompleted(order: IOrder) {
    const data = await axios.post(
      '/api/order/complete',
      JSON.stringify({ id: order.id, user: 'taxopark' }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Data: ', data)
  }

  async completeOrder(order: IOrder) {
    try {
      await this.sendOrderCompleted(order)
      this.deleteFromAccepted(order)
    } catch (e) {
      console.log('Complete error: ', e.message)
    }
  }

  // /finish

}

decorate(Store, {
  pendingOrders: observable,
  acceptedOrders: observable,

  addToPending: action,
  addToAccepted: action,
  deleteFromPending: action,
  deleteFromAccepted: action,
  sendOrderAccepted: action,
  acceptOrder: action,
  sendOrderCompleted: action,
  completeOrder: action

})

export const ordersStore = new Store()
