import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import BreadcrumbOne from '../../components/BreadcrumbOne'
import BreadcrumbTwo from '../../components/BreadcrumbTwo'
import BreadcrumbThree from '../../components/BreadcrumbThree'

const Breadcrumbs = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Breadcrumb' />

      <div className="flex flex-col gap-7.5">
        <BreadcrumbOne />
        <BreadcrumbTwo />
        <BreadcrumbThree />
      </div>
    </DefaultLayout>
  )
}

export default Breadcrumbs
