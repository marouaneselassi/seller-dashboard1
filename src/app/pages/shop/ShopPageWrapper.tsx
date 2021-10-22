import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {GeneralSettingsPage} from './GeneralSettingsPage'

const ShopPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>General Settings</PageTitle>
      <GeneralSettingsPage />
    </>
  )
}

export default ShopPageWrapper;
