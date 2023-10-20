'use client';

import React from 'react'
import SignInButton from './SignInButton'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
// import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const Appbar = () => {
  return (
    <header> 
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Nav className="" style={{justifyContent:"flex-end",width:"100%"}}>
                <SignInButton/>
            </Nav>
            </Container>
        </Navbar>
    </header>
  )
}

export default Appbar