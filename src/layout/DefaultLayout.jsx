import React, { useState } from 'react';
import Header from '../components/Header';

const DefaultLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
            <div className='flex h-screen overflow-hidden'>
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className='m-5'>
                        <div className='mx-auto max-w-screen-2xl'>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout;
