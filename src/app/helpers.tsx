import React from 'react';
// import { Routes } from './AppRouter';
// import i18next from 'i18next';

export default class Helper {

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
