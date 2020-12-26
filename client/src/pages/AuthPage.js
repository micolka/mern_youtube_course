import React, { useState, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  // useEffect( () => {
  //   message(error)
  //   clearError()
  // }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.id]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
      message(e.message)
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
      message(e.message)
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short the link</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>

          <div className="input-field">
            <input 
              placeholder="Enter email" 
              id="email"
              type="text"
              value={form.email} 
              className="yellow-input"
              onChange={changeHandler} 
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input 
              placeholder="Enter password" 
              id="password"
              type="text" 
              value={form.password} 
              className="yellow-input" 
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>

          </div>
        </div>
        <div className="card-action">
          <button 
            className="btn yellow darken-4" 
            onClick={loginHandler}
            style={{marginRight: 10}}
            disabled={loading}
          >Enter</button>
          <button 
            className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}
          >Registration</button>
        </div>
      </div>
      </div>
    </div>
  )
}
