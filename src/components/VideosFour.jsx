import React from 'react';

const VideosFour = () => {
  return (
    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5'>
        <h3 className='font-medium text-black dark:text-white'>
          Responsive Aspect ratios 1:1
        </h3>
      </div>

      <div className='p-4 sm:p-6 xl:p-10'>
        <iframe
          className='aspect-square w-full'
          src='https://www.youtube.com/embed/zpOULjyy-n8?rel=0'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideosFour;
