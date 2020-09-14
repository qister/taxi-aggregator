import { action, decorate, observable } from 'mobx'

class Store {
  connected: boolean = false

  setOnline() {
    this.connected = true
  }

  setOffline() {
    this.connected = false
  }

  // getUser() {
  //   fetch('https://randomuser.me/api/')
  //     .then(res => res.json())
  //     .then(json => {
  //       if(json.results) {
  //         //this.setUser(json.results);
  //         runInAction(() => {
  //           this.user = json.results[0];
  //         })
  //       }
  //     })
  // }

  // setUser(results) {
  //   this.user = results[0];
  // }
}

decorate(Store, {
  connected: observable,
  setOnline: action,
  setOffline: action,
})

export const appStore = new Store()
