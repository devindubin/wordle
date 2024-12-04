import { useContext } from 'react';
import { GameContext } from '../context/Context';
import { Row } from './Row';

export const Board = () => {
  const { board } = useContext(GameContext);
  

  const content = (
    <div className='board'>
      {board.map((row, index) => (
        <Row key={index} rowData={row} attempt={index} />
      ))}
    </div>
  );

  return content;
};
