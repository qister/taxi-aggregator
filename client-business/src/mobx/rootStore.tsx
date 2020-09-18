import { appStore } from "./appStore"
import { ordersStore } from "./ordersStore"


class RootStore {
  appStore
  ordersStore

  constructor() {
      this.appStore = appStore
      this.ordersStore = ordersStore
  }
}

export const rootStore = new RootStore()