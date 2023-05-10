import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import ChartOne from '../../components/ChartOne'
import ChartTwo from '../../components/ChartTwo'
import ChartThree from '../../components/ChartThree'

const BasicChart = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Basic Chart' />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  )
}

export default BasicChart
