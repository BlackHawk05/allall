import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import ButtonsGroupOne from '../../components/ButtonsGroupOne'
import ButtonsGroupTwo from '../../components/ButtonsGroupTwo'

const ButtonsGroup = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Buttons Group' />

            <div className="flex flex-col gap-7.5">
                <ButtonsGroupOne />
                <ButtonsGroupTwo />
            </div>
        </DefaultLayout>
    )
}

export default ButtonsGroup
