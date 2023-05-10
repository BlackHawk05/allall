import React from 'react';

const BadgeThree = () => {
  return (
    <div class='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div class='border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5'>
        <h3 class='font-medium text-black dark:text-white'>Badge Style 3</h3>
      </div>

      <div class='p-4 sm:p-6 xl:p-10'>
        <div class='flex flex-wrap items-center gap-2 sm:gap-4.5'>
          <button class='inline-flex rounded-full bg-primary py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Primary
          </button>
          <button class='inline-flex rounded-full bg-[#13C296] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Secondary
          </button>
          <button class='inline-flex rounded-full bg-[#212B36] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Dark
          </button>
          <button class='inline-flex rounded-full bg-[#637381] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Gray
          </button>
          <button class='inline-flex rounded-full bg-[#EFEFEF] py-1 px-3 text-sm font-medium text-[#212B36] hover:bg-opacity-90'>
            Light
          </button>
          <button class='inline-flex rounded-full bg-[#F9C107] py-1 px-3 text-sm font-medium text-[#212B36] hover:bg-opacity-90'>
            Warning
          </button>
          <button class='inline-flex rounded-full bg-[#DC3545] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Danger
          </button>
          <button class='inline-flex rounded-full bg-[#3CA745] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Success
          </button>
          <button class='inline-flex rounded-full bg-[#3BA2B8] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90'>
            Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default BadgeThree;
