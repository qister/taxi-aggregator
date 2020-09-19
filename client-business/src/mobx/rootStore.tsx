import { appStore } from "./appStore"
import { ordersStore } from "./ordersStore"
// import lala from 'mobx-devtools-mst'


class RootStore {
  appStore: any
  ordersStore: any

  constructor() {
      this.appStore = appStore
      this.ordersStore = ordersStore
  }
}

export const rootStore = new RootStore()
