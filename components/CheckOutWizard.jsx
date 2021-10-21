import React, { useContext } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useStyles from '../utils/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { Store } from '../utils/Store';

export default function CheckOutWizard({ activeStep = 0 }) {
  const { state } = useContext(Store);
  const { darkMode } = state;
  const classes = useStyles();
  const theme = createTheme({
    typography: {
      fontFamily: 'Maven Pro, sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#b89165',
      },
      secondary: {
        main: '#424242',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Stepper className={classes.transparentBackground} activeStep={activeStep} alternativeLabel>
        {['Identificación', 'Envío', 'Método de pago', 'Orden'].map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </ThemeProvider>
  );
}
