import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
    return (
        <div className='mb-5 bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-5'>
            <h2 className='text-title-md2 font-semibold text-black dark:text-white'>
                {props.pageName}
            </h2>

            <nav>
                <ol className='flex items-center gap-2'>
                    <li>
                        <Link className='font-medium' to='/'>Главная</Link> /
                    </li>
                    <li className='font-medium'>{props.pageName}</li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb;
