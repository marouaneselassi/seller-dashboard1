import axios from 'axios';
import store from './../redux/Store';

const URL = 'https://seller-api-nosrzlfv3q-oa.a.run.app/'; 
// const URL = 'http://localhost:3000/';

console.log('env', process.env.PUBLIC_URL);
const axiosInstance = axios.create({
  // baseURL: process.env.PUBLIC_URL + '/',
  baseURL: URL,
  headers : {
    "Content-Type" : "application/json",
  }
});

const get = (url : string, params : any, headers = null) => {
  let storeData = store.getState();
  let auth : any = storeData['auth'];

  if (auth?.user_id != undefined) {
    params = {...params, user_id : auth.user_id}
  }

  return axiosInstance.get(url, params)
    .then((res) => {
      return res.data;
    })
};

const post = (url : string, params : any, headers = null) => {
  return new Promise((resolve, reject) => {
    // let auth : any = null;
    let storeData = store.getState();
    let auth : any = storeData['auth'];

    if (auth?.user_id != undefined) {
      params = {...params, user_id : auth.user_id}
    }
    

    return axiosInstance.post(url, params)
    .then((res) => {
      if ('error' in res['data'] && res['data']['error'] == true) {
        reject(res);
      }

      return resolve(res.data);
    })
    .catch(err => {
      reject(err);
    })
  });
}

export default {
  get,
  post
}

