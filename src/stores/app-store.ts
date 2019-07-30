import { observable, action } from 'mobx'
import { fetchData } from '../_helpers/index'

class AppStore {
  @observable ip: string = null
  @observable previousPath: string

  @action clearStore = () => {
    this.ip = null
  }

  @action getIp = (format: any) => {
    return fetchData
      .get(`https://api.ipify.org/`, format, {}) // https://api.ipify.org?format=json
      .then(({ data, http_code }) => {
        if (http_code === 200) {
          this.clearStore()
          Object.assign(this, data)
        }
      })
      .catch(() => {
        // this.error = err;
        // this.loading = false;
      })
  }
}

export const appStore = new AppStore()
