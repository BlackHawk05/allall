import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { Content } from '~/components/Content';
import DefaultLayout from '~/layout/DefaultLayout';
import { mocks } from './mocks';
import { ConfigProfile } from '~/components/ConfigForms/Profile';
import { Tabs } from '~/shared/ui/Tabs';
import { UserStore } from '~/services/user';
import { useStore } from 'effector-react';

const Config: React.FC = () => {
    const { page = 'profile' } = useParams();
    const { tabs } = mocks;
    const user = useStore(UserStore.$user);

    const renderContent = () => {
        switch (page) {
            case 'profile':
                return user && <ConfigProfile />

            case 'social':
                return <div>{page}</div>

            case 'users':
                return <div>{page}</div>
        
            default:
                return <div>Страница не найдена</div>
        }
    }
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Настройки' />
            <Content>
                <Tabs tabs={tabs} currentPage={page} />
                <div className='p-5'>
                    {renderContent()}
                </div>
            </Content>
        </DefaultLayout>
    )
}

export default Config;
