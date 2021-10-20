/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl, uploadedFile} from '../../../_metronic/helpers'
// import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'

import { Http } from '../../../setup';


import Helper from '../../helpers';

import {getLayout, ILayout, LayoutSetup, useLayout} from '../../../_metronic/layout/core'

import './Order.scss';

const OrdersPage: React.FC = () => {

  const {setLayout} = useLayout()
  const [tab, setTab] = useState('Header')
  const [orders, setOrders] = useState([]);
  const [config, setConfig] = useState<ILayout>(getLayout())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)

  useEffect(() => {
    loadOrders();
  }, []);

  const updateData = (fieldsToUpdate: Partial<ILayout>) => {
    const updatedData = {...config, ...fieldsToUpdate}
    setConfig(updatedData)
  }

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
    } catch (error) {
      setConfig(getLayout())
    }
    setTimeout(() => {
      setLayout(config)
      setConfigLoading(false)
    }, 1000)
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayout())
      setResetLoading(false)
    }, 1000)
  }

  const loadOrders = () => {

    Http.post('orders', {})
      .then((data : any) => {
        console.log('res', data);
        setOrders(data['orders']);
      })
  }

  const getUserLabel = (user : any) => {
    if (user != null) {
      return user.name;
    }

    return 'زائر';
  }

  const getStatusLabel = (status : string) => {
    const labels : any = {
      'confirmed' : 'تم التاكيد',
      'on_delivery' : 'جاري التوصيل',
      'delivered' : 'تم التسليم',
      'pending' : 'جديد',
      'cancelled' : 'ملغي'
    };

    return labels[status];
  }

  

  return (
    <>
          <div className="card">
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Recent Orders</span>
          {/* <span className='text-muted mt-1 fw-bold fs-7'>Over 500 orders</span> */}
        </h3>
        <div className='card-toolbar d-none'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bolder px-3 py-4'>Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mb-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Customer
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              {/* begin::Menu item */}
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Staff Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Member Group
                  </a>
                </div>
                {/* end::Menu item */}
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
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
                      data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Order Id</th>
                <th className='min-w-140px'>Customer</th>
                <th className='min-w-120px'>Date</th>
                {/* <th className='min-w-120px'>Company</th> */}
                <th className='min-w-120px'>Total</th>
                <th className='min-w-120px'>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            <tbody>
              {orders.map((order : any) => (
                <tr>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                      {order.code}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                      {getUserLabel(order.user)}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>Customer</span>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                      05/28/2020
                    </a>
                    {/* <span className='text-muted fw-bold text-muted d-block fs-7'>Code: Paid</span> */}
                  </td>
                  {/* <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                      Intertico
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      Web, UI/UX Design
                    </span>
                  </td> */}
                  <td className='text-dark fw-bolder text-hover-primary fs-6'>
                    {Helper.amountFormat(order.grand_total)}
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      {order.payment_type}
                    </span>
                  </td>
                  <td className="order-status">
                    <span className={`badge badge-light-success order-status-${order.delivery_status}`}>
                      {getStatusLabel(order.delivery_status)}
                    </span>
                  </td>
                  <td className='text-end'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                    </a>
                    {/* <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a> */}
                    {/* <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </a> */}
                  </td>
                </tr>
              ))}
            </tbody>
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

export {OrdersPage}
