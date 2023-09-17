import React from 'react';
import Button from 'react-bootstrap/Button';
import spotify_logo from '../assets/spotify_logo.svg';

const Login = ({url}) => {
    return (
        <div className='bg-white login_container'>
            <p>Login on your Spotify account to search for songs and create new playlists.<br />
            Click the button below to login.</p>
            <Button variant="yellow" size="lg" className="mt-4" href={url}>
            <span className="m-6 d-inline-block">LOGIN</span>
            <img src={spotify_logo} className="spotify_logo" alt="logo" />
        </Button>
        </div>
    )
}

export default Login;