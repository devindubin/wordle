import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { GameContext } from './context/Context';
import { Keyboard } from './components/Keyboard';
import { PopupWin, PopupLose } from './components/PopUp';
// import { generateWord } from './lib/data';
import { generateCharacter, dataSourceCount } from './lib/greyData';
// import {CharacterAvatar} from './components/CharacterAvatar'

export function App(props) {
  const [character, setCharacter] = useState(generateCharacter());

  const [board, setBoard] = useState(
    Array(5).fill(Array.from(character.name.replace(' ', '')).fill(''))
  );

  const [boardStatus, setBoardStatus] = useState(
    Array(5).fill(Array.from(character.name.replace(' ', '')).fill(0))
  );

 

  const [attempt, setAttempt] = useState(0);

  const [gameIsWon, setGameIsWon] = useState(false);

  const [letterPos, setLetterPos] = useState(0);

  //replace this board with charboard
  // const [board, setBoard] = useState([
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  // ]);

  // replace this boardStatus with charBoard status
  // const [boardStatus, setBoardStatus] = useState([
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0],
  // ]);

  const checkSolution = guess => {
    //Check for position and letter matches
    const formattedSolution = character.name.replace(' ','').toUpperCase()

    const colorMap = guess.map((letter, index) => {
      if (letter === formattedSolution[index]) {
        return 2;
      } else if (formattedSolution.includes(letter)) {
        return 1;
      } else {
        return 3;
      }
    });

    const newBoardStatus = boardStatus.map((row, attemptIndex) =>
      attempt === attemptIndex ? colorMap : row
    );
    setBoardStatus(newBoardStatus);
    if (guess.join('') === formattedSolution) {
      console.log('You win');
      setGameIsWon(true);
    }
  };

  const onEnter = () => {
    console.log(letterPos,character.name.replace(' ', '').length)
    if (letterPos !== character.name.replace(' ', '').length) {
      console.log('Need Full answer');
      return;
    }

    const guess = board.filter((_, index) => index === attempt)[0];

    checkSolution(guess);

    setLetterPos(0);
    setAttempt(n => n + 1);
  };

  const onDelete = () => {
    const newBoard = board.map((_, index) =>
      index === attempt ? _.map((el, i) => (i === letterPos - 1 ? '' : el)) : _
    );

    setBoard(newBoard);
    if (letterPos === 0) return;
    setLetterPos(n => n - 1);
  };

  const onKeyPress = ({ key }) => {
    
    if (key.toLowerCase() === 'enter') {
      onEnter();
    } else if (
      key.toLowerCase() === 'backspace' ||
      key.toLowerCase() === 'delete'
    ) {
      onDelete();
    } else {
      console.log(letterPos,character.name.replace(' ', '').length)
      if (
        letterPos > character.name.replace(' ', '').length ||
        '1234567890 '.includes(key) || key.toLowerCase() === 'alt' || key.toLowerCase() === 'shift' || key.toLowerCase() === 'ctrl'
      )
        return;
      const newBoard = board.map((_, index) =>
        index === attempt ? _.map((el, i) => (i === letterPos ? key.toUpperCase() : el)) : _
      );

      setLetterPos(n => n + 1);
      setBoard(newBoard);
    }
  };

  const resetGame = () => {
    const newCharacter = generateCharacter();
    setCharacter(newCharacter);
    setAttempt(0);
    setGameIsWon(false);
    setLetterPos(0);
    setBoard(
      Array(5).fill(Array.from(newCharacter.name.replace(' ', '')).fill(''))
    );
    setBoardStatus(
      Array(5).fill(Array.from(character.name.replace(' ', '')).fill(0))
    );
  };

  
  const handleCheckSolution = useCallback((guess) => {
    const formattedSolution = character.name.replace(' ','').toUpperCase()

    const colorMap = guess.map((letter, index) => {
      if (letter === formattedSolution[index]) {
        return 2;
      } else if (formattedSolution.includes(letter)) {
        return 1;
      } else {
        return 3;
      }
    });

    const newBoardStatus = boardStatus.map((row, attemptIndex) =>
      attempt === attemptIndex ? colorMap : row
    );
    setBoardStatus(newBoardStatus);
    if (guess.join('') === formattedSolution) {
      console.log('You win');
      setGameIsWon(true);
    }
  },[attempt,boardStatus,character])

  const handleDelete = useCallback(()=> {
    const newBoard = board.map((_, index) =>
      index === attempt ? _.map((el, i) => (i === letterPos - 1 ? '' : el)) : _
    );

    setBoard(newBoard);
    if (letterPos === 0) return;
    setLetterPos(n => n - 1);
  },[attempt,board,letterPos])

  const handleEnter = useCallback(()=> {
    console.log(letterPos,character.name.replace(' ', '').length)
    if (letterPos !== character.name.replace(' ', '').length) {
      console.log('Need Full answer');
      return;
    }

    const guess = board.filter((_, index) => index === attempt)[0];

    handleCheckSolution(guess);

    setLetterPos(0);
    setAttempt(n => n + 1);
  },[attempt,board,character,handleCheckSolution,letterPos])



  const handleKeyPress = useCallback(({key})=> {
    console.log(key)
    if (key.toLowerCase() === 'enter') {
      handleEnter();
    } else if (
      key.toLowerCase() === 'backspace' ||
      key.toLowerCase() === 'delete'
    ) {
      handleDelete();
    } else {
      console.log(letterPos,character.name.replace(' ','').length)
      if (
        letterPos === character.name.replace(' ', '').length ||
        '1234567890 '.includes(key) || key.toLowerCase() === 'alt' || key.toLowerCase() === 'shift' || key.toLowerCase() === 'ctrl'
      )
        return;
      const newBoard = board.map((_, index) =>
        index === attempt ? _.map((el, i) => (i === letterPos ? key.toUpperCase() : el)) : _
      );

      setLetterPos(n => n + 1);
      setBoard(newBoard);

  }},[attempt,board,character,letterPos, handleDelete,handleEnter])


  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className='App'>
    <nav><h1>Wordle - Currently {dataSourceCount} options!</h1></nav>
      <GameContext.Provider
        value={{
          board,
          setBoard,
          onKeyPress,
          attempt,
          letterPos,
          boardStatus,
          resetGame,
        }}
      >
        
        <Board />
        {gameIsWon && <PopupWin isOpen={gameIsWon} onClose={resetGame} solution={character.name} />}
        {attempt > 4 && gameIsWon === false && <PopupLose isOpen={attempt > 4} onClose={resetGame} solution={character.name}/>}
        <Keyboard />
      </GameContext.Provider>
    </div>
  );
}

// Log to console
