import React from 'react';
import { Content } from '~/components/Content';
import DefaultLayout from '~/layout/DefaultLayout';

const Main: React.FC = () => {
    return (
        <DefaultLayout>
            <Content classnames='p-5'>
                main
            </Content>
        </DefaultLayout>
    )
}

export default Main;
