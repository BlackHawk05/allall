import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import TooltipsOne from '../../components/TooltipsOne'
import TooltipsTwo from '../../components/TooltipsTwo'

const Tooltips = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tooltips' />

      <div className="flex flex-col gap-7.5">
        <TooltipsOne />
        <TooltipsTwo />
      </div>
    </DefaultLayout>
  )
}

export default Tooltips
