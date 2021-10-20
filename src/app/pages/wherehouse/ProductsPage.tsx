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

import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'

// const ProductsPage: React.FC = () => {
class ProductsPage extends React.Component {

  constructor(props?:any) {
    super(props);


    this.saveChanges = this.saveChanges.bind(this);
  }

  pushNotification(type : string = 'success', message : string = '') {
    notification['success']({
      message : message,
      description: 'This is the content of the notification. This is the content.',
    });
  };

  // const {setLayout} = useLayout()
  // const [tab, setTab] = useState('Header')
  // const [products, setProducts] = useState([]);
  // const [config, setConfig] = useState<ILayout>(getLayout())
  // const [configLoading, setConfigLoading] = useState<boolean>(false)
  // const [resetLoading, setResetLoading] = useState<boolean>(false)
  // const [editProductDrawer, setEditProductDrawer] = useState(false);
  // const [product, setProduct] = useState<any>({});
  // const [editProductParams, setEditProductParams] = useState<any>({});


  // useEffect(() => {
  //   loadProducts();
  // }, []);

  // const updateData = (fieldsToUpdate: Partial<ILayout>) => {
  //   const updatedData = {...config, ...fieldsToUpdate}
  //   setConfig(updatedData)
  // }

  // const updateConfig = () => {
  //   setConfigLoading(true)
  //   try {
  //     LayoutSetup.setConfig(config)
  //   } catch (error) {
  //     setConfig(getLayout())
  //   }
  //   setTimeout(() => {
  //     setLayout(config)
  //     setConfigLoading(false)
  //   }, 1000)
  // }

  // const reset = () => {
  //   setResetLoading(true)
  //   setTimeout(() => {
  //     setConfig(getLayout())
  //     setResetLoading(false)
  //   }, 1000)
  // }

  // const editProduct = (product : any) => {
  //   setEditProductDrawer(true);
  //   setProduct(product);
  // }

  // const loadProducts = () => {

  //   Http.post('products', {})
  //     .then((data : any) => {
  //       console.log('res', data);
  //       setProducts(data['products']);
  //     })
  // }

  // const handleProductChange = ($event : any) => {
  //   console.log('pr', $event);
  //   const name = $event.target['name'];
  //   const value = $event.target['value'];
  //   product[name] = value;
  //   setProduct({
  //     ...product
  //   });
  // }

  // loadProducts();

  state : any = {
    editProductDrawer : false,
    products : [],
    toUpdate : [],
    product : {}
  }

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
          products : data['products']
        })
      })
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
    const { editProductDrawer, products, product } = this.state;
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
          <Switch checkedChildren="متاح" unCheckedChildren="غير متاح" defaultChecked />
        </div>
        
      </Drawer>

      <div className="card">
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Members Statistics</span>
            <span className='text-muted mt-1 fw-bold fs-7'>Over 500 members</span>
          </h3>
          <div
            className='card-toolbar'
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
                  <th className='min-w-150px'>Authors</th>
                  <th className='min-w-140px'>Company</th>
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
                          <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
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
                          {/* <Button>dqw</Button> */}
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                        </a>
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
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      </>
    )
  }
}

export {ProductsPage}
