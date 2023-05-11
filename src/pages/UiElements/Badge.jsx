import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import BadgeOne from '../../components/BadgeOne'
import BadgeTwo from '../../components/BadgeTwo'
import BadgeThree from '../../components/BadgeThree'
import BadgeFour from '../../components/BadgeFour'

const Badge = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Badge' />

            <div class="flex flex-col gap-7.5">
                <BadgeOne />
                <BadgeTwo />
                <BadgeThree />
                <BadgeFour />
            </div>
        </DefaultLayout>
    )
}

export default Badge
