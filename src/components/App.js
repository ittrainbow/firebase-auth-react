import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import AuthProvider from '../contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
        <div className='w-100' style={{maxWidth: '300px'}}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<Dashboard/>}/>
              </Route>
              <Route path='/update-profile' element={<PrivateRoute/>}>
                <Route path='/update-profile' element={<UpdateProfile/>}/>
              </Route>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App
