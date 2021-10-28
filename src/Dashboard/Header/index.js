import React, { useContext, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { signInWithGoogle, logout } from '../../services/auth'
import { UserContext } from '../../contexts/user';
import { NavLink } from 'react-router-dom';
import "./Header.css"

// nav bar & signin 

function Header() {

  const [user, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if (userBySignIn) setUser(userBySignIn);
    console.log(userBySignIn);
  };


  return (
    <Navbar  variant="dark" class="navbar navbar-light"  style={{backgroundColor:"rgb(238, 251, 255)"}}>
      <Container>
        <div>
          <lable className="skyWay">SkyWay</lable>
      {/* <img src={require("../../Assests/logo.png").default}  height="100px"  class="d-inline-block align-top" alt="Skyway"></img> */}
      </div>
  
        <Nav className="me-auto">
          {/* <Nav.Link><Button variant="p-3 mb-2 bg-light text-dark" onClick={logout}>Logout</Button></Nav.Link> */}
          <Nav.Link>
            {user ? <img src={user.photoURL} className="img" /> :null }
          </Nav.Link>
          <Nav.Link> <button class="signinGoogle" onClick={signInBtnClick}>  <img src={require("../../Assests/google.png").default} className="Google"></img> Signin with google</button></Nav.Link>
          <Nav.Link> <button class="logout" onClick={logout}> Logout</button></Nav.Link>
          
          </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
