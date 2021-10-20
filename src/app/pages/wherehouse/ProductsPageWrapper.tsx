import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {ProductsPage} from './ProductsPage'
import {DrawerProduct} from './DrawerProduct'

const ProductsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <ProductsPage />
      <DrawerProduct />
    </>
  )
}

export default ProductsPageWrapper
