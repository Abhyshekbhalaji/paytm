import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Transfer from './components/Transfer';
import ErrorBoundary from './components/ErrorBoundary';
import DashBoard from './components/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import {Toaster} from 'react-hot-toast';

function App() {
 const [token, setToken] = useState(null);
const [theme,setTheme] =useState(() => localStorage.getItem('theme') || 'light');

 useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark'); // optional
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light'); // optional
    }
    localStorage.setItem('theme', theme);
  }, [theme]);



const toggleTheme =()=>{
  setTheme((prev)=> (prev==='dark' ? 'light' : 'dark'));
}
useEffect(() => {
  const savedToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  setToken(savedToken);
}, [token]);

  return (
    <ErrorBoundary>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={ <SignIn />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashBoard toggleTheme={toggleTheme} theme={theme} />
            </ProtectedRoute>
          } />

          <Route path="/send" element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          } />

          <Route path="*" element={<h1>No page found.</h1>} />  
         
          
        </Routes>
      </BrowserRouter> 
 
    </ErrorBoundary>
  );
}

export default App;
