import { action, decorate, observable } from 'mobx'

class Store {
  pendingOrders: any[] = []
  acceptedOrders: any[] = []

  addToPending(order: any) {
    this.pendingOrders.push(order)
  }

  addToAccepted(order: any) {
    this.acceptedOrders.push(order)
  }

  deleteFromPending(order: any) {
    // console.log('Order: ', order)

    this.pendingOrders = this.pendingOrders.filter((item) => {
      console.log('item to delete: ', item)
      return item.id !== order.id
    })
  }

  moveToAccepted(order: any) {
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
