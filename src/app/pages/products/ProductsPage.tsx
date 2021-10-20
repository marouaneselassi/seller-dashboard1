/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl, uploadedFile} from '../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import { Button,  MultiSelect, TextInput } from '@mantine/core';
import { Drawer, Space, Switch, InputNumber, notification } from 'antd';
import { Input } from './Input';
import Helper from './../../helpers';

import './Product.scss';

import { Http } from '../../../setup';
import Mdb from './../../libs/mdb';

import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'

// const ProductsPage: React.FC = () => {
class ProductsPage extends React.Component {

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
      <Drawer 
        className="drawer-edit-product"
        title="Edit Product" 
        width={500}
        placement="left" 
        onClose={() => this.setState({editProductDrawer : false})}
        visible={editProductDrawer}
        footer={
          <Space>
            {/* <Button onClick={this.onClose}>Cancel</Button> */}
            <Button onClick={this.saveChanges}>
              Save
            </Button>
          </Space>
        }
      >
        
        <div className="form-group">
          <label>اسم المنتج</label>
          <TextInput 
            disabled={true}
            value={product.name}
            name="name"
            onChange={(e) => {
              this.handleProductChangeT(e)
            }}
          />
        </div>

        <div className="form-group">
          <label>الكمية المتوفرة</label>
          <InputNumber 
            value={product.current_stock}
            name="current_stock"
            onChange={(val : number) => {
              this.handleProductChange(val, 'current_stock')
            }}
          />
        </div>

        {/* <div className="form-group">
          <label>التصنيف</label>
          <InputNumber 
            value={product.category_id}
            name="category_id"
            onChange={(val : number) => {
              this.handleProductChange(val, 'category_id')
            }}
          />
        </div> */}

        <div className="form-group">
          <label>السعر</label>
          <InputNumber 
            value={product.unit_price}
            name="unit_price"
            onChange={(val : number) => {
              this.handleProductChange(val, 'unit_price')
            }}
          />
        </div>

        <div className="form-group">
          <label>عرض المنتج</label>
          <Switch checkedChildren="متاح" unCheckedChildren="غير متاح" defaultChecked 
            onChange={(val : boolean) => {
              if (val == true) {
                this.handleProductChange(1, 'published')
              } else {
                this.handleProductChange(0, 'published')
              }
            }}
          />
        </div>
        
      </Drawer>

      <div className="card">
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Products</span>
            {/* <span className='text-muted mt-1 fw-bold fs-7'>Over 500 members</span> */}
          </h3>
          <div
            className='card-toolbar d-none'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <a
              href='#'
              className='btn btn-sm btn-light-primary'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_invite_friends'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New Member
            </a>
          </div>
        </div>
        <div className="card-body" style={{background:'#f9f9f9'}}>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <input type="text" placeholder="Search By name" className="form-control"
                  onChange={(e) => {
                    this.setState({
                      filter : { ...filter, query : e.target.value }
                    })
                    this.handleSearchByName(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <input type="text" placeholder="Search By SKU" className="form-control"/>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <select className="form-control" 
                  onChange={(e) => {
                    // this.setState({
                    //   filter : { ...filter, a : e.target.value }
                    // })
                    this.handleSearchByStatus(e.target.value)
                  }}
                >
                  <option value="all">عرض الكل</option>
                  <option value="published">متاح على المتجر</option>
                  <option value="unpublish">غير متاح</option>
                  <option value="out-of-stock">كمية قليلة</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th className='w-25px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-9-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-150px'>Product</th>
                  <th className='min-w-140px'>Price</th>
                  <th className='min-w-120px'>Quantity</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {products.map((product : any) => (
                  <tr key={product.id.toString()}>
                    <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                      </div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center' style={{maxWidth:'300px'}}>
                        <div className='symbol symbol-45px me-5'>
                          <img src={uploadedFile(product?.image?.file_name)} alt='' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <a href={`https://enab.com.sa/p/${product.slug}`} className='text-dark fw-bolder text-hover-primary fs-6'>
                            {product.name}
                          </a>
                          <span className='text-muted fw-bold text-muted d-block fs-7'
                            style={{height: "19px",overflow: "hidden"}}
                          >
                            {product?.category?.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        {Helper.amountFormat(product.unit_price)}
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {/* {product?.category?.name} */}
                      </span>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-muted me-2 fs-7 fw-bold'>{product.current_stock}</span>
                        </div>
                        <div className='progress h-6px w-100'>
                          <div
                            className='progress-bar bg-primary'
                            role='progressbar'
                            style={{width: '50%'}}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1
                            
                          '
                          onClick={() => {
                            this.onEditProduct(product)
                          }}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen019.svg'
                            className='svg-icon-3'
                          />
                        </a>
                        {/* <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                        </a> */}
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>

          {loading == true && (
            <div style={{padding:"30px 0", textAlign : "center"}}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      </>
    )
  }
}

export {ProductsPage}
