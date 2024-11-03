import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Toolbar, Typography, AppBar, Container, CssBaseline, Button } from '@mui/material';
import './App.css'


function App() {


  return (
    <>
    <Router>
      <Container maxWidth="xl">
        <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PT Portal
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/customers">Customers</Button>
          <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
        </Toolbar>
      </AppBar>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
      </Router>
    </>
  )
}

export default App
