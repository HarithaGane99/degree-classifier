import { FC } from 'react'
import styles from '../styles/ClassificationBadge.module.css'

interface Props {
  classification: string
}

const ClassificationBadge: FC<Props> = ({ classification }) => {
  return (
    <div className={`${styles.badge} ${styles[classification.replace(':', '')]}`}>
      {classification} Class Honours
    </div>
  )
}

export default ClassificationBadge