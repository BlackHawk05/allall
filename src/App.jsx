import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './pages/Authentication/ResetPassword'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Calendar from './pages/Calendar'
import BasicChart from './pages/Chart/BasicChart'
import AdvancedChart from './pages/Chart/AdvancedChart'
import Analytics from './pages/Dashboard/Analytics'
import CRM from './pages/Dashboard/CRM'
import ECommerce from './pages/Dashboard/ECommerce'
import Marketing from './pages/Dashboard/Marketing'
import FormElements from './pages/Form/FormElements'
import FormLayout from './pages/Form/FormLayout'
import Inbox from './pages/Inbox'
import Invoice from './pages/Invoice'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Tables from './pages/Tables'
import TaskKanban from './pages/Task/TaskKanban'
import TaskList from './pages/Task/TaskList'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
import ButtonsGroup from './pages/UiElements/ButtonsGroup'
import Badge from './pages/UiElements/Badge'
import Breadcrumbs from './pages/UiElements/Breadcrumbs'
import Cards from './pages/UiElements/Cards'
import Dropdowns from './pages/UiElements/Dropdowns'
import Modals from './pages/UiElements/Modals'
import Tabs from './pages/UiElements/Tabs'
import Tooltips from './pages/UiElements/Tooltips'
import Popovers from './pages/UiElements/Popovers'
import Accordion from './pages/UiElements/Accordion'
import Notifications from './pages/UiElements/Notifications'
import Pagination from './pages/UiElements/Pagination'
import Progress from './pages/UiElements/Progress'
import Carousel from './pages/UiElements/Carousel'
import Images from './pages/UiElements/Images'
import Videos from './pages/UiElements/Videos'
import Settings from './pages/Pages/Settings'
import FileManager from './pages/Pages/FileManager'
import DataTables from './pages/Pages/DataTables'
import PricingTables from './pages/Pages/PricingTables'
import ErrorPage from './pages/Pages/ErrorPage'
import MailSuccess from './pages/Pages/MailSuccess'

const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/' element={<Analytics />} />
          <Route path='/dashboard/ecommerce' element={<ECommerce />} />
          <Route path='/dashboard/marketing' element={<Marketing />} />
          <Route path='/dashboard/crm' element={<CRM />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/tasks/task-list' element={<TaskList />} />
          <Route path='/tasks/task-kanban' element={<TaskKanban />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/forms/form-layout' element={<FormLayout />} />
          <Route path='/tables' element={<Tables />} />
          <Route path='/pages/settings' element={<Settings />} />
          <Route path='/pages/file-manager' element={<FileManager/>} />
          <Route path='/pages/data-tables' element={<DataTables />} />
          <Route path='/pages/pricing-tables' element={<PricingTables/>} />
          <Route path='/pages/error-page' element={<ErrorPage/>} />
          <Route path='/pages/mail-success' element={<MailSuccess/>} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/chart/basic-chart' element={<BasicChart />} />
          <Route path='/chart/advanced-chart' element={<AdvancedChart />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
          <Route path='/ui/buttons-group' element={<ButtonsGroup />} />
          <Route path='/ui/badge' element={<Badge />} />
          <Route path='/ui/breadcrumbs' element={<Breadcrumbs />} />
          <Route path='/ui/cards' element={<Cards />} />
          <Route path='/ui/dropdowns' element={<Dropdowns />} />
          <Route path='/ui/modals' element={<Modals />} />
          <Route path='/ui/tabs' element={<Tabs />} />
          <Route path='/ui/tooltips' element={<Tooltips />} />
          <Route path='/ui/popovers' element={<Popovers />} />
          <Route path='/ui/accordion' element={<Accordion />} />
          <Route path='/ui/notifications' element={<Notifications />} />
          <Route path='/ui/pagination' element={<Pagination />} />
          <Route path='/ui/progress' element={<Progress />} />
          <Route path='/ui/carousel' element={<Carousel />} />
          <Route path='/ui/images' element={<Images />} />
          <Route path='/ui/videos' element={<Videos />} />
          <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
        </Routes>
      </>
    )
  )
}

export default App
