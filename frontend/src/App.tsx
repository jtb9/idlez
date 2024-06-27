import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { themeOptions } from './Utils/Theme';
import Splash from './Scenes/Splash';
import { useAtom } from 'jotai';
import { gameAtom } from './State/GameState';
import Game from './Scenes/Game';

function App() {
  const [game, setGame] = useAtom<any>(gameAtom);

  const renderScene = () => {
    if (game.scene === "game") {
      return <Game />
    }

    return <Splash />
  }

  return (
    <ThemeProvider theme={themeOptions}>
      {renderScene()}
    </ThemeProvider>
  );
}

export default App;
