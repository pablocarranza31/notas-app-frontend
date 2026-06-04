import styles from './DeleteConfirm.module.css'

const DeleteConfirm = ({ onDelete, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>Eliminar nota</h3>
        <p className={styles.texto}>¿Estás seguro? Esta acción no se puede deshacer.</p>
        <div className={styles.acciones}>
          <button className={styles.btnCancelar} onClick={onCancel}>Cancelar</button>
          <button className={styles.btnEliminar} onClick={onDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm