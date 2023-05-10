import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import AccordionOne from '../../components/AccordionOne'
import AccordionTwo from '../../components/AccordionTwo'

const Accordion = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Accordion' />

      <div className="flex flex-col gap-7.5">
        <AccordionOne />
        <AccordionTwo />
      </div>
    </DefaultLayout>
  )
}

export default Accordion
