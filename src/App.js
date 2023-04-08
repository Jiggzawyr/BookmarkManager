import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookmarkManager from './Components/BookmarkManager/BookmarkManager';
import Login from './Components/Login/Login';
import NoPage from './Components/NoPage/NoPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import React, { useEffect } from "react";

function App() {

  const [user, setUser] = React.useState({ authenticated: false});

  const handleLogin = () => {
      console.log("handleLogin")
      setUser({ authenticated: true});  
      console.log(user)
  }

  useEffect(() => {
    console.log("App use effect")
    console.log(user)
  }, [user])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login handleLogin={handleLogin} />} />
            <Route
              path="bookmark-manager"
              element={
                <ProtectedRoute user={user}>
                  <BookmarkManager />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
