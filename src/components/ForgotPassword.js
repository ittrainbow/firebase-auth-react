import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {
  const emailRef = useRef()
  const { resetPassword } = useAuth()

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Проверьте почтовый ящик')
    } catch {
      setError('Не удалось обнулить пароль')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-3 w-100'>Сброс пароля</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className='mt-3 w-100 text-center' type='submit'>
              Сбросить пароль
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Войти</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='text-center mt-2'>
        Нет аккаунта? <Link to='/signup'>Регистрация</Link>
      </div>
    </>
  )
}

export default ForgotPassword
