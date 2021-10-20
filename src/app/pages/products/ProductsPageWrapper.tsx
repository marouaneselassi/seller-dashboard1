import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {ProductsPage} from './ProductsPage'

const ProductsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Products</PageTitle>
      <ProductsPage />
    </>
  )
}

export default ProductsPageWrapper
