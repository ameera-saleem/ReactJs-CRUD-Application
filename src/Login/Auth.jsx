import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'





const Auth = (props)=>{
    // Error Handling && Getting The Input Value
    const [Register, setRegister] = useState()
    const [empty, setEmpty] = useState(false)
    const [error, setError] = useState(false)
    const [value, setValue] = useState({
        email: '',
        password: ''
      })


    const inputValue = (event) =>{
        const {name, value} = event.target
        setValue((prevData) =>{
          return {...prevData,
            [name] : value}
        })
        
    }

    // Login User to access Protect Routes
    const Onsubmit = (e) =>{
      
      if(value.email === '' && value.password === ''){
        setEmpty(true)
        setTimeout(() => {
          setEmpty(false)
        }, 1000);
        return ;
      }
     
      
      try{ fetch('http://localhost:8000/auth/login', {
        method : 'POST',
        headers : {
          "Accept" : 'application/json',
          "Content-Type" : 'application/json'
        },
        body : 
         JSON.stringify(value)
       }).then( response => {
        if (!response.ok) {
          setError(true)
          e.preventDefault()
        setTimeout(() => {
          setError(false)
        }, 1000); 
          return
        }
        else {
            return response.json() 
        }
       }).then((result) => {
        if(result && value !== 'undefined' && value !== null){
        localStorage.setItem("auth",JSON.stringify(result.access_token))
        props.history.push('/home')
          
      }
       } )
       
      }
      catch (error) {
        console.log(error)
      }
      
    }

    // Register User to access Protect Routes
    const onRegister = (e) =>{

      // If Fields re empty stop the api get request
      if(value.email === '' && value.password === ''){
        setEmpty(true)
        setTimeout(() => {
          setEmpty(false)
        }, 1000);
        return ;
      }
      
      try{ fetch('http://localhost:8000/auth/register', {
        method : 'POST',
        headers : {
          "Accept" : 'application/json',
          "Content-Type" : 'application/json'
        },
        body : 
         JSON.stringify(value)
       }).then( response => {
        if (!response.ok) {
          setError(true)
          e.preventDefault()
         setTimeout(() => {
          setError(false)
        }, 1000); 
          return
        }
        else {
            return response.json() 
        }
       }).then((result) => {
      if(result && value !== 'undefined' && value !== null){
        localStorage.setItem("auth",JSON.stringify(result.access_token))
        props.history.push('/home')
          
      }
       } )
       
      }
      catch (error) {
        console.log(error)
      }
      
    }


    return(
        <>
         <div className = "wrapper">
         {!Register ?
        //  Login Form Ui
        <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Log in
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput label="Your email" group type="text" 
              validate onChange = {inputValue} value = {value.email} name = "email" />
              <MDBInput
                onChange = {inputValue} value = {value.password} name = 'password'
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
               {error ? <p style = {{color : 'red', fontWeight : 600}}>This user is not resgistered</p> : null }
               {empty ? <p style = {{color : 'red', fontWeight : 600}}>Please Fill in your field</p> : null }
              <div className="text-center mb-4 mt-5">
                  <MDBBtn
                  onClick = {Onsubmit}
                  color="danger"
                  type="button"
                  className="btn-block z-depth-2"
                >
                Log In
                </MDBBtn>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Don't have an account?
                <MDBBtn
                  color="danger"
                  type="button"
                  id = "register-btn"
                  className="  z-depth-2"
                 onClick = {() => setRegister(true) }
                >
                Sign Up
              </MDBBtn> 
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
         :

         //  Sign Up Form Ui
         <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Log in
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput label="Your email" group type="text" 
              validate onChange = {inputValue} value = {value.email} name = "email" />
              {error ? <p style = {{color : 'white'}}>Incorrect email</p> : null } 
              <MDBInput
              onChange = {inputValue} value = {value.password} name = 'password'
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
               {error ? <p style = {{color : 'red', fontWeight : 600}}>User not registered</p> : null }
               {empty ? <p style = {{color : 'red', fontWeight : 600}}>Please Fill in your field</p> : null }
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                 onClick = {onRegister}
                  color="danger"
                  type="button"
                  className="btn-block z-depth-2"
                >
                  Sign Up
                </MDBBtn> 
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Already have an account?
                <MDBBtn
                  color="danger"
                  type="button"
                  id = "register-btn"
                  className="  z-depth-2"
                 onClick = {() => setRegister(false) }
                >
                Login In
              </MDBBtn> 
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      }
        </div>
        </>
    )
}


export default Auth