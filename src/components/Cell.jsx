import {GameContext} from '../context/Context'
import {useContext} from 'react'

export const Cell = ({cell,letterPosition,attempt}) => {
  
  const {boardStatus} = useContext(GameContext)

  const colorMapCode = boardStatus[attempt][letterPosition]
  


  return <div className={`cell cmp-${colorMapCode}`}>{cell}</div>
}