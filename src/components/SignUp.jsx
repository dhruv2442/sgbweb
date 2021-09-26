import React, { useState } from 'react';
import { auth,fs } from '../config/Config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link,useHistory } from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = (e) => {

    
    e.preventDefault();
    // console.log(fullName,email,password);
    createUserWithEmailAndPassword(auth,email,password).then((credentials)=>{
        console.log(credentials);
        // const userId = credentials.user.uid;
        setDoc(doc(fs, "users",credentials.user.uid), {
            Fullname: fullName,
            email: email,
            password: password
          }).then(()=>{
            setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
            setFullName('');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/login');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }).catch((error)=>{
        setErrorMsg(error.message)
    })
  };

  return (
    <div className='container'>
      <br />
      <br />
      <h1>Sign Up</h1>
      <hr />
      {successMsg && <>
      <br />
          <div className="success-msg">{successMsg}</div>
      </>}
      <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
        <label>Full Name</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <br />
        <br />
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
            <span>Already Have an Account Login</span>{' '}
            <Link to='login'>Here</Link>{' '}
          </div>
          <div className='right col-md-4 col-12 text-center py-3'>
            <button type='submit' className='btn btn-success btn-md'>
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {errorMsg && <>
      <br />
          <div className="error-msg">{errorMsg}</div>
      </>}
    </div>
  );
};

export default SignUp;
