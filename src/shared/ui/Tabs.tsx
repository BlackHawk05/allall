import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface ITab {
    name: string;
    url: string;
}

interface IProps {
    tabs: ITab[];
    currentPage: string;
}

export const Tabs: React.FC<IProps> = (props) => {
    const { tabs, currentPage } = props;

    return (
        <div className='flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10'>
            {tabs?.map((item, index) => {
                const classname = classNames([
                    'relative overflow-hidden px-5 py-4 text-sm font-medium hover:text-primary md:text-base',
                    'after:content-[ ] after:h-[2px] after:bg-primary after:w-full after:absolute after:bottom-0',
                    'after:transition-all after:duration-[400ms] after:ease-in-out',
                    item.url === currentPage 
                        ? 'after:left-0 text-primary border-primary'
                        : 'after:-left-[100rem]',
                ])
                return (
                    <Link to={item.url} key={index} className={classname}>
                        {item.name}
                    </Link>
                )
            })}
        </div>
    )
}