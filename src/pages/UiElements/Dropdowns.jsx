import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import DropdownsTwo from '../../components/DropdownsTwo'
import DropdownsOne from '../../components/DropdownsOne'
import DropdownsThree from '../../components/DropdownsThree'

const Dropdowns = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Dropdowns' />

      <div className="flex flex-col gap-7.5">
        <DropdownsOne />
        <DropdownsTwo />
        <DropdownsThree />
      </div>
    </DefaultLayout>
  )
}

export default Dropdowns
