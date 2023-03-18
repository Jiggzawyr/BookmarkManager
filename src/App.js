import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookmarkManager from './Components/BookmarkManager/BookmarkManager';
import Login from './Components/Login/Login';
import NoPage from './Components/NoPage/NoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="bookmark-manager" element={<BookmarkManager />} />
            <Route path="*" element={<NoPage />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
