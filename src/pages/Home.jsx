import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeleteConfirm from '../components/DeleteConfirm'
import styles from './Home.module.css'


const Home = () => {
  const navigate = useNavigate()
  const [notas, setNotas] = useState([])
  const [notaAEliminar, setNotaAEliminar] = useState(null)

  useEffect(() => {
    const fetchNotas = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/')
        return
      }
      const res = await axios.get('http://localhost:3000/notas', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotas(res.data)
    }
    fetchNotas()
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>Home</h2>
        <button className={styles.btnNueva} onClick={() => navigate('/notas/nueva')}>
          Nueva nota
        </button>
      </div>
      <div className={styles.grid}>
        {notas.map(nota => (
          <div key={nota.id} className={styles.nota} style={{ background: nota.color }}>
            <h3 className={styles.notaTitulo}>{nota.titulo}</h3>
            <p className={styles.notaContenido}>{nota.contenido}</p>
            <p className={styles.notaCategoria}><em>{nota.categoria}</em></p>
            <div className={styles.notaAcciones}>
            <button className={styles.btnEditar} onClick={() => navigate(`/notas/${nota.id}/editar`, { state: { nota } })}>
              Editar
            </button>            
            <button className={styles.btnEliminar} onClick={() => setNotaAEliminar(nota.id)}>
              Eliminar
            </button>
            {notaAEliminar === nota.id && (
              <DeleteConfirm
                notaId={nota.id}
                onCancel={() => setNotaAEliminar(null)}
                onDelete={async () => {
                  const token = localStorage.getItem('token')
                  await axios.delete(`http://localhost:3000/notas/${nota.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  })
                  setNotas(notas.filter(n => n.id !== nota.id))
                  setNotaAEliminar(null)
                }}
              />
            )}
            </div>
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default Home