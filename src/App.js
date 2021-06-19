import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Raleway',
      },
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {/* <Router> */}
        <Header />
        <div className="main">
          <Home />
        </div>
        <Footer />
    </div>
    </ThemeProvider>
  )
}

export default App;
