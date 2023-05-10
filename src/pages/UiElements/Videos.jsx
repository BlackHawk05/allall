import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DefaultLayout from '../../layout/DefaultLayout'
import VideosOne from '../../components/VideosOne'
import VideosTwo from '../../components/VideosTwo'
import VideosThree from '../../components/VideosThree'
import VideosFour from '../../components/VideosFour'

const Videos = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Videos' />

      <div className="flex flex-col gap-7.5">
        <VideosOne />
        <VideosTwo />
        <VideosThree />
        <VideosFour />
      </div>
    </DefaultLayout>
  )
}

export default Videos
