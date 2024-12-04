import { Cell } from './Cell';

export const Row = ({ rowData, attempt }) => {
  
  const content = (
    <div className='row'>
      {rowData.map((cell, index) => (
        <Cell key={index} attempt={attempt} letterPosition={index} cell={cell} />
      ))}
    </div>
  );
  return content;
};
