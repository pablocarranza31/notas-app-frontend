import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import styles from './NoteForm.module.css'

const NoteForm = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const nota = location.state?.nota

  const [titulo, setTitulo] = useState(nota ? nota.titulo : '')
  const [contenido, setContenido] = useState(nota ? nota.contenido : '')
  const [categoria, setCategoria] = useState(nota ? nota.categoria : '')
  const [color, setColor] = useState(nota?.color || '#fef08a')



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if(nota) {
        await axios.put(`http://localhost:3000/notas/${nota.id}`, { titulo, contenido, categoria, color }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('http://localhost:3000/notas', { titulo, contenido, categoria, color },{
          headers: { Authorization: `Bearer ${token}` }
        })
      }
        
        navigate('/home')
    } catch (error) {
      alert('Credenciales inválidas')
    }
  }



  return (
    <div className={styles.container}>
      <button className={styles.btnRegresar} onClick={() => navigate('/home')}>
        ← Regresar
      </button>
      <div className={styles.card}>
      <h2 className={styles.Title}>{nota ? 'Editar Nota' : 'Crear Nota'}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Contenido:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Categoría:</label>
            <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className={styles.formInput}
            />  
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorInput}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          {nota ? 'Actualizar Nota' : 'Crear Nota'}
        </button>
      </form>
      </div>
    </div>
  )
}

export default NoteForm


