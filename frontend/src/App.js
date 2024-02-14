import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import Footer from './components/Footer'
import CategoriesNav from './components/CategoriesNav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
  
const App = () => {
  return (
    <>
      <Header />
      <div className='app-container'>
        <div className='nav-categories'>
          <CategoriesNav />
        </div>

        <Container className='main-content'>
          <Outlet />
        </Container>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
