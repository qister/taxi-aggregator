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
      console.log('item to delete: ', item)
      return item.id !== order.id
    })
  }

  async acceptOrder(order: IOrder) {
    // console.log('rerere: ', rere);

    // const data = await request('/api/order/accept', 'POST', { id: order.id })

    const data = await axios.post(
      '/api/order/accept',
      JSON.stringify({ id: order.id }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('Data: ', data)
  }

  async moveToAccepted(order: IOrder) {
    try {
      await this.acceptOrder(order)
      this.addToAccepted(order)
      this.deleteFromPending(order)
    } catch(e) {

    }

  }
}

decorate(Store, {
  pendingOrders: observable,
  acceptedOrders: observable,

  addToPending: action,
  addToAccepted: action,
  deleteFromPending: action,
  moveToAccepted: action,
})

export const ordersStore = new Store()
