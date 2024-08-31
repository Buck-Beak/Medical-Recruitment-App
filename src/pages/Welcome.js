import React, { useState, useEffect, useCallback } from 'react';
import Home from './Home';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
//@import url('https://fonts.googleapis.com/css2?family=Voga:wght@400;700&display=swap');
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import CreateUser from '../pages/CreateUser';
import {Routes,Route} from 'react-router-dom';
import VideoBackground from './VideoBackground'; // Import the VideoBackground component
//import './App.css'; 

const useStyles = makeStyles({
  '@keyframes heartbeat': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.1)' },
    '50%': { transform: 'scale(1)' },
  },
  '@keyframes ecg': {
    '0%': { strokeDashoffset: 2000 },
    '50%': { strokeDashoffset: 0 },
    '100%': { strokeDashoffset: -2000 },
  },
  root: {
    minHeight: '100vh',
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
    color: 'black',
  },
  appBar: {
    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.5) 30%, rgba(33, 203, 243, 0.5) 90%)',
    height: 'calc(3.5rem + 2cm)',
  },
  title: {
    flexGrow: 1,
    
  },
  button: {
    marginTop: '10px',
    marginBottom: '3cm',
  },
  content: {
    marginTop: '20px',
    textAlign: 'center',
  },
  ecgLine: {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    width: '100%',
    height: '200px',
    transform: 'translateX(-50%)',
    strokeWidth: '2',
    strokeDasharray: '2000',
    animation: '$ecg 10s linear infinite',
  },
});

function App() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5, // Adjust threshold to prevent rapid triggers
  });

  const navigate = useNavigate(); // Initialize useNavigate without arguments

  const handleloginClick = () =>{
    navigate ('/login');
  }
  const handlesignupClick = () =>{
    navigate ('/createuser');
  }
  const handleaboutClick = () =>{
    navigate ('/about');
  }


  const fetchItems = useCallback(async () => {
    if (!hasMore) return;

    try {
      const response = await axios.get('https://api.example.com/items', {
        params: { page: items.length / 10 + 1, limit: 10 },
      });

      setItems((prevItems) => [...prevItems, ...response.data.items]);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [hasMore, items.length]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchItems();
    }
  }, [inView, fetchItems, hasMore]);

  return (
    <div className={classes.root}>
       <VideoBackground />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          
          <Typography variant="h2" className={classes.title} align="left" color ='#ffffff' style={{ fontFamily: 'Ittalics, sans-serif'}}>
           HEARTBEAT CAREERS
          </Typography>
          
          {/*<Button color="inherit" onClick={handleaboutClick}>ABOUT</Button>
          <Button color="inherit" onClick={handleloginClick}>SIGNIN</Button>
          <Button color="inherit" onClick={handlesignupClick}>SIGNUP</Button>*/}
        </Toolbar>
      </AppBar>
      <Container>
        <Box className={classes.content}>
          {/*<Typography variant="h2">Welcome</Typography>*/}
          {/*<Typography variant="h5">Here is some dynamic content:</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1cm' }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              SIGN UP
            </Button>
          </Box>*/}
          {items.map((item, index) => (
            <Box key={index} mb={2}>
              <Typography variant="body1">{item.content}</Typography>
            </Box>
          ))}
          <div ref={ref} /> {/* This div triggers fetching more items */}
        </Box> 
        {/*</Container> {/* ECG Line Effect */}
      {/*<svg className={classes.ecgLine}>
        <polyline
          points="0,100 20,100 40,100 60,50 80,150 100,100 120,100 140,100 160,100 180,100 200,100 220,100 240,100 260,50 280,150 300,100 320,100 340,100"
          fill="none"
          stroke="#e91e63"
        />
      </svg>*/}
      </Container>
      {/*<Routes>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/create-user" element={<CreateUser/>}/>
        <Route path="/" element={<Home />} />
      </Routes>*/}
    </div>
  );
}

export default App;