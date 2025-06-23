import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login  from './pages/Login';
import Upload from './pages/Upload';
import Feed   from './pages/Feed';

function App() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login  />} />
        <Route path="/upload" element={token ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/"       element={<Feed   />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
