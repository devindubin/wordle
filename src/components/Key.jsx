import { GameContext } from '../context/Context';
import { useContext } from 'react';

export const Key = ({ value, colorMapCode =0 }) => {
  const { onKeyPress } = useContext(GameContext);

  return (
    <div
      className={`letter ${colorMapCode}`}
      onClick={() => {
        onKeyPress({key:value});
      }}
    >
      {value}
    </div>
  );
};
