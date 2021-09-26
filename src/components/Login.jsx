import React, { useState } from 'react';
import { auth } from '../config/Config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setSuccessMsg('Login Successfull. You will now automatically get redirected to HomePage');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/');
            },3000)
        // ...
      })
      .catch((error) => {
        setErrorMsg(error.message)
      });
  };
  return (
    <div className='container'>
      <br />
      <br />
      <h1>Login</h1>
      <hr />
      {successMsg && (
        <>
          <br />
          <div className='success-msg'>{successMsg}</div>
        </>
      )}
      <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type='email'
          className='form-control'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <br />
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <div className='row'>
          <div className='left col-md-8 col-12'>
            <span>Don't Have an Account SignUp</span>{' '}
            <Link to='signup'>Here</Link>{' '}
          </div>
          <div className='right col-md-4 col-12 text-center py-3'>
            <button type='submit' className='btn btn-success btn-md'>
              Login
            </button>
          </div>
        </div>
      </form>
      {errorMsg && (
        <>
          <br />
          <div className='error-msg'>{errorMsg}</div>
        </>
      )}
    </div>
  );
};

export default Login;
