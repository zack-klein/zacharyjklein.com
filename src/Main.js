import React from 'react';
import Base from './Base'
import Home from './Home';


import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#304ffe',
    },
    error: {
      main: "#ff604f"
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#304ffe',
    },
    error: {
      main: "#ff604f"
    },
  },
});

const prefersDark = {
  true: darkTheme,
  false: lightTheme,
}

const Main = () => {

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [state, setState] = React.useState({
    checked: false,
    resumaydayData: null,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Base
      page={<Home />}
      darkModeChanger={handleChange}
      state={state}
      drawerOpener={handleDrawerOpen}
      drawerCloser={handleDrawerClose}
      currentTheme={prefersDark[state.checked]}
      drawerOpen={open}
    />
  );
}

export default Main;
