import CustomerList from './components/customerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Toolbar, Typography, AppBar, Container, CssBaseline, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css'
import TrainingCalendar from './components/TrainingCalendar';
import TrainingChart from './components/TrainingChart';
import { useState } from 'react';


function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <Router>
      <Container maxWidth="xl">
        <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size='large'
            edge="start"
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              <MenuItem
              component={Link}
              to="/customers"
              onClick={handleClose}
              >Customers</MenuItem>
              <MenuItem
              component={Link}
              to="/trainings"
              onClick={handleClose}
              >Trainings</MenuItem>
              <MenuItem
              component={Link}
              to="/calendar"
              onClick={handleClose}
              >Calendar</MenuItem>
              <MenuItem
              component={Link}
              to="/charts"
              onClick={handleClose}
              >Charts</MenuItem>
            </Menu>
          <Button color="inherit" component={Link} to="/">PT PORTAL</Button>
        </Toolbar>
      </AppBar>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<TrainingCalendar />} />
          <Route path="/charts" element={<TrainingChart />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
      </Router>
    </>
  )
}

export default App
