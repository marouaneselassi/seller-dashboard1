import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {OrdersPage} from './OrdersPage'

const OrdersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Orders</PageTitle>
      <OrdersPage />
    </>
  )
}

export default OrdersPageWrapper
