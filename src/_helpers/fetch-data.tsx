import axios from 'axios'
// import util from 'util';

const generateHeader = (method: any, headers: any) => {
  headers = headers || {}
  if (!headers['Content-Type'] && (method === 'post' || method === 'put')) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

const fetch = (method: any, url: any, data: any, params: any, headers: any) => {
  const axiosParams = {
    method,
    url,
    data,
    params,
    timeout: 10000,
    // withCredentials: true,
    headers: generateHeader(method, headers)
  }

  return axios(axiosParams)
    .then((resData: any) => {
      // console.log(util.inspect(resData.data, false, null));
      if (!resData) {
        throw { message: 'Something went wrong with server.', type: 'crash', http_code: 500 }
      }
      if (resData.status === 201 || resData.status === 204) {
        return { data: { status: 'ok' }, http_code: resData.status }
      }
      if (resData.status === 404) {
        return { http_code: resData.status }
      }
      if (resData.status === 500) {
        return { http_code: 500 }
      }
      if (resData.data === undefined) {
        throw {
          message: 'Something went wrong with server. Status 200, but data is missing',
          type: 'crash',
          http_code: 500
        }
      }
      return { data: resData.data, http_code: resData.status }
    })
    .catch(err => {
      if (!err) {
        console.error('Fetch failed with unknown error', axiosParams) // tslint:disable-line no-console
        return
      }
      if (
        err.response &&
        err.response.status === 401 &&
        err.response.data &&
        (err.response.data.type === 'AuthFailure' || err.response.data.type === 'EmptyToken')
      ) {
        return { http_code: err.response.status, data: err.response.data }
      }
      if (err.response && err.response.status) {
        // TODO log only on DEV env
        /* tslint:disable */
        console.log(
          `FETCH ERROR! Method: ${method}, Code: ${err.response.status}, text: ${err.response.statusText}, url: ${url}${
            data ? ', data:' + JSON.stringify(data) : ''
          }${params ? ', query:' + JSON.stringify(params) : ''}`
        )
        /* tslint:enable */
        return { http_code: err.response.status, data: err.response.data }
      }
      if (err.errno) {
        console.log(err.errno) // tslint:disable-line no-console
        throw {
          type: 'crash',
          http_code: 500,
          message: err.errno === 'ENOTFOUND' ? 'Broken URL' : 'Something went wrong in fetch'
        }
      }
      if (err.code && err.code === 'ECONNABORTED') {
        /* tslint:disable */
        console.log(
          // tslint:disable-line no-console
          `FETCH TIMEOUT ERROR! Method: ${method}, Code: ${err.response.status}, text: ${
            err.response.statusText
          }, url: ${url}${data ? ', data:' + JSON.stringify(data) : ''}${
            params ? ', query:' + JSON.stringify(params) : ''
          }`
        )
        /* tslint:enable */
        throw {
          type: 'action_needed',
          http_code: 408,
          message: `Internal service timeouted`,
          show_message: true,
          action_name: 'INTERNAL_SERVICE_TIMEOUT'
        }
      }
      // TODO catch timeout
      if (err) {
        console.log(err.status) // tslint:disable-line no-console
        console.log(err) // tslint:disable-line no-console
      }
    })
}

const get = (url: any, params: any, headers?: any) => fetch('get', url, undefined, params, headers)
const post = (url: any, data: any, headers?: any) => fetch('post', url, data, undefined, headers)
const put = (url: any, data: any, headers?: any) => fetch('put', url, data, undefined, headers)
const del = (url: any, params: any, headers?: any) => fetch('delete', url, undefined, params, headers)

export default {
  get,
  post,
  put,
  del
}
