import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const Dashboard = (props) => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Не удалось выйти')
    }
  }

  return (
    <>
      <Card>
        <Card.Body className='text-center'>
          <h2 className='mb-4'>Профиль</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
            Изменить профиль
          </Link>
        </Card.Body>        
        <div className='w-100 text-center'>
          <Button variant='link' onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>
    </>
  )
}

export default Dashboard
