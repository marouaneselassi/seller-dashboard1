/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl, uploadedFile} from '../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import { Button,  MultiSelect, TextInput } from '@mantine/core';
import { Drawer, Space, Switch, InputNumber, notification } from 'antd';

import Helper from './../../helpers';

import './Shop.scss';

import { Http } from '../../../setup';
import Mdb from './../../libs/mdb';

import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'

// const ProductsPage: React.FC = () => {
class GeneralSettingsPage extends React.Component {

  mdb : any = null;
  state : any = {
    editProductDrawer : false,
    _stored_products : [],
    products : [],
    toUpdate : [],
    product : {},
    filter : {
      query : '',
      sku : ''
    },
    loading : true
  }

  constructor(
    props?:any,
    // public mdb = Mdb
    ) {
    super(props);

    // this.mdb = new Mdb;
    // this.mdb =
    
    this.mdb = new Mdb({
      baseUrl : '',
      Http : ''
    });
    
    // console.log('mdb', this.mdb);



    this.saveChanges = this.saveChanges.bind(this);
  }

  pushNotification(type : string = 'success', message : string = '') {
    notification['success']({
      message : message,
      description: 'This is the content of the notification. This is the content.',
    });
  };


  

  componentDidMount() {
    this.loadProducts();
  }

  onEditProduct(product : any) {
    // setEditProductDrawer(true);
    this.setState({
      editProductDrawer : true,
      product
    })
  }

  loadProducts() {
    Http.post('products', {})
      .then((data : any) => {
        // console.log('res', data);
        // setProducts(data['products']);
        this.setState({
          products : data['products'],
          _stored_products : data['products'],
          loading : false
        })
      })
  }

  handleSearchByStatus(val : string) {
    const { _stored_products } = this.state;
    let products = [];

    if (val == 'published') {
      products = _stored_products.filter((product : any) => {
        if (product['published'] == 1 && product['thumbnail_img'] != null && product['current_stock'] > 0) {
          return product;
        }
      });
    }
    else if (val == 'unpublish') {
      products = _stored_products.filter((product : any) => {
        if (product['published'] == 0 || product['thumbnail_img'] == null) {
          return product;
        }
      });
    }
    else if (val == 'out-of-stock') {
      products = _stored_products.filter((product : any) => {
        if (product['current_stock'] == 0) {
          return product;
        }
      });
    }
    else if (val == 'all') {
      products = _stored_products.filter((product : any) => {
        return product;
      });
    }
    
    this.setState({ products });
  }

  handleSearchByName(query : string) {
    const { _stored_products } = this.state;
    let products = _stored_products.filter((product : any) => {
      if (product['name'].match(query)) {
        return product;
      }
    });

    this.setState({ products });
  }

  handleChange (){
    // return disabled || readOnly || !onChange ? null : onChange(e.target.value);
  }

  saveChanges() {
    const { product, toUpdate, products } = this.state;

    let params : any = {};
    toUpdate.forEach((item : string) => {
      params[item] = product[item];
    });

    Http.post('products/update', {
      id : product.id,
      data : {
        ...params
      }
    })
    .then(res => {
      for(let i = 0; i < products.length; i++) {
        if (products[i]['id'] == product.id) {
          products[i] = product;
          break;
        }
      }
      this.pushNotification('success', 'The product has been saved');
      this.setState({products});
      console.log('res', res);
    })
    .catch(err => {
      console.log('err', err);
    });
    
  }

  handleProductChangeT(e : any) {
    const { product, toUpdate } = this.state;
    // if (e)
    this.setState({
      toUpdate : [...toUpdate, e.target.name],
      product : {
        ...product,
        [e.target.name] : e.target.value
      }
    });
  }

  handleProductChange(value : any, name : string) {
    const { product, toUpdate } = this.state;
    // if (e)
    this.setState({
      toUpdate : [...toUpdate, name],
      product : {
        ...product,
        [name] : value
      }
    });
  }

  render() {
    // const { t } = this.props;
    const { editProductDrawer, products, product, loading, filter } = this.state;
    return (
      <>
        <div className="card">
          <div className="card-header">المعلومات الاولية</div>
          <div className="card-body">
            <div className="form-group">
              <TextInput
                placeholder="Your name"
                label="اسم المتجر"
                required
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export { GeneralSettingsPage }
