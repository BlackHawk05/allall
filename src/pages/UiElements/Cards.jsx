import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';

import userEleven from '../../images/user/user-11.png'
import userTwelve from '../../images/user/user-12.png'
import userThirteen from '../../images/user/user-13.png'
import CardsOne from '../../images/cards/cards-01.png'
import CardsTwo from '../../images/cards/cards-02.png'
import CardsThree from '../../images/cards/cards-03.png'
import CardsFour from '../../images/cards/cards-04.png'
import CardsFive from '../../images/cards/cards-05.png'
import CardsSix from '../../images/cards/cards-06.png'
import { Link } from 'react-router-dom';

const Cards = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='Cards' />

            <div className='grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='flex items-center gap-3 py-5 px-6'>
                        <div className='h-10 w-10 rounded-full'>
                            <img src={userEleven} alt='User' />
                        </div>
                        <div>
                            <h4 className='font-medium text-black dark:text-white'>
                                Naimur Rahman
                            </h4>
                            <p className='text-sm'>Content Writer</p>
                        </div>
                    </div>

                    <Link to='#' className='block px-4'>
                        <img src={CardsOne} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='flex items-center gap-3 py-5 px-6'>
                        <div className='h-10 w-10 rounded-full'>
                            <img src={userTwelve} alt='User' />
                        </div>
                        <div>
                            <h4 className='font-medium text-black dark:text-white'>
                                Musharof Chy
                            </h4>
                            <p className='text-sm'>Web Developer</p>
                        </div>
                    </div>

                    <Link to='#' className='block px-4'>
                        <img src={CardsTwo} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='flex items-center gap-3 py-5 px-6'>
                        <div className='h-10 w-10 rounded-full'>
                            <img src={userThirteen} alt='User' />
                        </div>
                        <div>
                            <h4 className='font-medium text-black dark:text-white'>
                                Shafiq Hammad
                            </h4>
                            <p className='text-sm'>Front-end Developer</p>
                        </div>
                    </div>

                    <Link to='#' className='block px-4'>
                        <img src={CardsThree} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>
            </div>

            <h2 className='mt-10 mb-7.5 text-title-md2 font-semibold text-black dark:text-white'>
                Cards
            </h2>

            <div className='grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <Link to='#' className='block px-4 pt-4'>
                        <img src={CardsFour} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <Link to='#' className='block px-4 pt-4'>
                        <img src={CardsFive} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <Link to='#' className='block px-4 pt-4'>
                        <img src={CardsSix} alt='Cards' />
                    </Link>

                    <div className='p-6'>
                        <h4 className='mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>
            </div>

            <h2 className='mt-10 mb-7.5 text-title-md2 font-semibold text-black dark:text-white'>
                Cards
            </h2>

            <div className='grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3'>
                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke p-5 px-7.5 dark:border-strokedark'>
                        <h4 className='text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                    </div>
                    <div className='px-7.5 pt-6 pb-9'>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke p-5 px-7.5 dark:border-strokedark'>
                        <h4 className='text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                    </div>
                    <div className='px-7.5 pt-6 pb-9'>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>

                <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                    <div className='border-b border-stroke p-5 px-7.5 dark:border-strokedark'>
                        <h4 className='text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary'>
                            <Link to='#'>Card Title here</Link>
                        </h4>
                    </div>
                    <div className='px-7.5 pt-6 pb-9'>
                        <p>
                            Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
                            fringilla goes scelerisque Interdum et.
                        </p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Cards;
