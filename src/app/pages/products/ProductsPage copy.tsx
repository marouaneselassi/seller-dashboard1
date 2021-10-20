/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl, uploadedFile} from '../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import { Button, Drawer, Input, MultiSelect, TextInput } from '@mantine/core';

import { Http } from '../../../setup';

import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'
import {
  TablesWidget1,
  TablesWidget2,
  TablesWidget3,
  TablesWidget4,
  TablesWidget5,
  TablesWidget6,
  TablesWidget7,
  TablesWidget8,
  TablesWidget9,
  TablesWidget10,
  TablesWidget11,
  TablesWidget12,
  TablesWidget13,
} from '../../../_metronic/partials/widgets'


// const ProductsPage: React.FC = () => {
class ProductsPage extends React.Component {

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

  state: any = {
    editProductDrawer : false,
    products : []
  };

  render(): JSX.Element {
    const { products } = this.state;
    return (
      <>

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
                  <th className='min-w-120px'>Progress</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {products.map((product : any) => (
                  <tr>
                    <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                      </div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px me-5'>
                          <img src={uploadedFile(product?.image?.file_name)} alt='' />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                          <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                            {product.name}
                          </a>
                          <span className='text-muted fw-bold text-muted d-block fs-7'>
                            HTML, JS, ReactJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        Web, UI/UX Design
                      </span>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
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
                            // editProduct(product)
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
