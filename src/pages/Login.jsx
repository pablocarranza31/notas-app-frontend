import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://notas-app-backend-69l6.onrender.com/users/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/home')
    } catch (error) {
      alert('Credenciales inválidas')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form  className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email:</label>
            <input
              type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Login
        </button>
      </form>
      <p>¿No tienes cuenta? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: '#6d28d9' }}>Regístrate</span></p>
      </div>
    </div>
  )
}

export default Login