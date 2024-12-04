import { Key } from './Key';
export const Keyboard = () => {
  const topRow = 'QWERTYUIOP'.split('');
  const middleRow = 'ASDFGHJKL'.split('');
  const bottomRow = 'ZXCVBNM'.split('');

  const content = (
    <div className='keyboard'>
      <div className='top-row'>
        {topRow.map(letter => (
          <Key key={letter} value={letter} />
        ))}
      </div>
      <div className='middle-row'>
        {middleRow.map(letter => (
          <Key key={letter} value={letter} />
        ))}
      </div>
      <div className='bottom-row'>
        <Key value='delete' />{' '}
        {bottomRow.map(letter => (
          <Key key={letter} value={letter} />
        ))}
        <Key value='enter' />
      </div>
    </div>
  );
  return content;
};
