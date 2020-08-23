import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AppDescription from './AppDescription';
import AppForm from './AppForm';
import AppResults from './AppResults';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://zacharyjklein.com/">
        Zachary J. Klein
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const steps = ['The backstory', 'Fill out this form', 'Results'];

const isLoading = (
  <React.Fragment>
  <br></br>
  <br></br>
  <LinearProgress/>
  </React.Fragment>
)
const showProgress = {
  false: <React.Fragment />,
  true: isLoading,
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function healthCheck (payload) {
   try {
     const resp = await fetch('https://api.zacharyjklein.com/healthy/', {
         method: 'GET',
     });
     if (resp.status !== 200) {
       return false
     }
     else {
       return true
     }
   } catch (err) {
     console.log(err);
     return false
     }
};

export default function Main() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    field1Value: '',
    field2Value: '',
    isLoading: false,
    isHealthy: 'initial',
  });

  function getStepContent(step, state) {
    switch (step) {
      case 0:
        return <AppDescription />;
      case 1:
        return <AppForm state={state} updater={setState} onSubmit={handleSubmit}/>;
      case 2:
        return <AppResults state={state}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const healthyChip = (
    <React.Fragment>
      <Chip
        variant="outlined"
        avatar={<DoneIcon style={{ color:'#4caf50' }}/>}
        label="Healthy"
      />
    </React.Fragment>
  )

  const unhealthyChip = (
    <React.Fragment>
      <Chip
        variant="outlined"
        avatar={<ClearIcon style={{ color:'#aa2e25' }}/>}
        label="Unhealthy"
      />
    </React.Fragment>
  )

  const healthStatus = {
    true: healthyChip,
    false: unhealthyChip,
    'initial': <React.Fragment />,
  };

  async function handleSubmit() {
    setState(
      { ...state, isLoading: true }
    );
    await sleep(2000);
    setState(
      { ...state, activeStep: state.activeStep + 1, isLoading: false }
    );
  };

  async function setActiveStep(step) {
    var isHealthy = await healthCheck();
    setState(
      { ...state, activeStep: step, isHealthy: isHealthy }
    );

  };

  const handleNext = () => {
    setActiveStep(state.activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(state.activeStep - 1);
  };

  const handleStartOver = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App Name
          </Typography>
          {healthStatus[state.isHealthy]}
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            App Name
          </Typography>
          <Stepper activeStep={state.activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {state.activeStep === steps.length - 1 ? (
              <React.Fragment>
                <AppResults state={state}/>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartOver}
                    className={classes.button}
                  >
                    Start Over
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(state.activeStep, state)}
                <div className={classes.buttons}>
                  {state.activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {
                    state.activeStep === steps.length - 2
                    ?
                    <Button variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.button}
                      type="submit"
                    >
                    Submit
                    </Button>
                    : <Button variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                    Next
                    </Button>
                  }

                </div>
              </React.Fragment>
            )}
            {showProgress[state.isLoading]}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
