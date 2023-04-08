import { useState } from 'react';
import './login.css';
import { TextField, Button } from '@mui/material';
import { authenticate } from "../../Services/AuthenticationService";
import { useNavigate } from 'react-router-dom';

export default function Login({handleLogin}) {

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const navigate = useNavigate();

    const handleLoginInClick = (e) => {
        e.preventDefault();
        let success = true;
        authenticate(username, password)
            .catch( () => {
                success = false;
            })
            .then( () => {
                if(success){
                    handleLogin();      
                    navigate('/bookmark-manager', { replace: true });
                }
            })
      }

    return (
        <div>
            <form className='login-form'>
                <div className='login-container'>
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        onClick={handleLoginInClick}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                </div>
            </form>
        </div>
    )
}