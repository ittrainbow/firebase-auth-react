import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Пароли не совпадают')
    }

    const promises = []

    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError('Не удалось обновить профиль')
      })
      .finally(
        setLoading(false)
      )
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3 w-100">Изменить профиль</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="... или оставьте поле пустым"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Подтверждение пароля</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}  placeholder="... или оставьте поле пустым"/>
            </Form.Group>
            <Button disabled={loading} className="mt-3 w-100" type="submit">
              Сохранить
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-2">
        <Link to={'/'}>Отмена</Link>
      </div>
    </>
  )
}

export default UpdateProfile
