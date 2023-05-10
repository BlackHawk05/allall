import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import TabOne from '../../components/TabOne';
import TabTwo from '../../components/TabTwo';
import TabThree from '../../components/TabThree';

const Tabs = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tabs' />

      <div className='flex flex-col gap-9'>
        <TabOne />
        <TabTwo />
        <TabThree />
      </div>
    </DefaultLayout>
  )
}

export default Tabs;
