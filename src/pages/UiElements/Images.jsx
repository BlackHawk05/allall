import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import ImagesTwo from '../../components/ImagesTwo'
import ImagesOne from '../../components/ImagesOne'

const Images = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Images' />

            <div className="flex flex-col gap-7.5">
                <ImagesOne />
                <ImagesTwo />
            </div>
        </DefaultLayout>
    )
}

export default Images
