import React from 'react';
// import { Routes } from './AppRouter';
// import i18next from 'i18next';
// import {  }

// import { Http } from '../../../setup';
import { Http } from '../../setup';


export default class Mdb {

  collectionName : string = '';
  method : string = '';
  args : any = {};

  payload : any = {
    collection : '',
    method : '',
    args : {}
  };

  baseUrl : string = 'http://localhost:3000/mgraph';
  http : any = null;

  constructor({baseUrl, Http} : any) {
    // this.baseUrl = baseUrl;
    // this.http = Http;
  }
  
  fn() {
    return this;
  }

  client() {
    // return Http.post('');
  }

  collection(name : string) {
    this.payload = {
      collection : name,
    };

    return this.fn();
  }

  where(where : any) {
    const { args } = this.payload;
    this.payload = {
      ...this.payload,
      args : {
        ...args,
        where
      }
    }

    return this.fn();
  }

  find(id : string) {
    this.payload = {
      ...this.payload,
      method : 'findUnique',
      args : {
        where : {
          id
        }
      }
    }

    return this.fn();
  }

  findOne(args : any = null) {
    // const { args } = this.payload;
    if (args != null) {
      this.payload = {
        ...this.payload,
        method : 'findUnique',
        args
      }  
    } else {
      this.payload = {
        ...this.payload,
        method : 'findUnique'
      }  
    }

    return this.fn();
  }

  findMany(data : any = {}) {
    // if (args != null) { 

    // }
    this.payload = {
      ...this.payload,
      method : 'findMany',
      args : data
    }

    return this.fn();
  }

  create(data : any) {
    this.payload = { 
      ...this.payload,
      method : 'create',
      args : {
        data
      }
    };

    return this.fn();
  }

  exec() {
    return new Promise((resolve, reject) => {
      Http.post(this.baseUrl, this.payload)
      .then((res : any) => {
        if (res['error'] == true) {
          return reject(res);
        }

        return resolve(res['data']);
      })
      .catch(err => {
        return reject(err);
      });
    });
  }

  /**
   * Format the amount.
   * @param {Object} amount
   */
  static amountFormat(amount : number, html = true) {
    const price = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount > 0 ? amount : 0);
    const currency = 'ريال'; //i18next.language === 'en' ? 'SAR' : 'ريال';

    if (!html) {
      return price + ' ' + currency;
    }

    return (
      <>
        <span>{price}</span> {currency}
      </>
    );
  }

  /**
   * Generate uid
   * @param {Number} length
   */
  static uid(length : number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
