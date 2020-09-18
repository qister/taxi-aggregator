import { action, decorate, observable } from 'mobx'

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
    // console.log('Order: ', order)

    this.pendingOrders = this.pendingOrders.filter((item) => {
      console.log('item to delete: ', item)
      return item.id !== order.id
    })
  }

  moveToAccepted(order: IOrder) {
    this.addToAccepted(order)
    this.deleteFromPending(order)
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
