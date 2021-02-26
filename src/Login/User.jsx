import React, {useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Data from './Data'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'



// Adding New User
const User = ({loader,data}) =>{

    // states
    const history = useHistory()
    const [empty, setEmpty] = useState(false)
    const [modalShow, setModalShow] = useState(false);


    const [value, setValue] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      })


      const inputValue = (event) =>{
        const {name, value} = event.target
        setValue((prevData) =>{
          return {...prevData,
            [name] : value}
        })
    }


    const addUser = async () =>{

        if(value === ''){
            setEmpty(true)
            setTimeout(() => {
              setEmpty(false)
            }, 1000);
            return ;
          }

          // Post request for adding new user
          await Axios.post('http://localhost:3003/users', value)
          history.push('/home')
          window.location.reload()

    }

    // Log out user 
    const Logout = () =>{
      localStorage.clear()
      window.location.reload()
    }

    // Add new User
    return (
        <>
         <nav><h1>User</h1>
         <ul><li>About</li><li>Contact</li></ul>
         <Button  variant="secondary" onClick={Logout}>Log out</Button>
         <Button  variant="primary" onClick={() => setModalShow(true)}>Add a user</Button>
         </nav>

         {/* Adding User Form */}
         {modalShow?
        <div className="bg-modal" >
	      <div className="modal-contents">
		    <div className="close" onClick={() => setModalShow(false)}>+</div>
            <h1>Fill In The Fields</h1>
            <input onChange = {inputValue} value = {value.name} name = "name"
             type = "text" placeholder = "Name"/>
            <input onChange = {inputValue} value = {value.username} name = "username"  
            type = "text" placeholder = "User name"/>
            <input onChange = {inputValue} value = {value.email} name = "email"  
            type = "email" placeholder = "Email"/>
            <input onChange = {inputValue} value = {value.phone} name = "phone" 
             type = "tel" placeholder = "010-692-6593 x09125"/>
            <input onChange = {inputValue} value = {value.website} name = "website" 
             type = "website" placeholder = "Website"/>
            <Button onClick = {addUser}  variant="danger" >Add a user</Button>
            {empty ? <p style = {{color : 'white'}}>Please Fill in your field</p> : null }
	     </div>
       </div>
      : null }

         {/* Show Loader or Data */}
         {!loader ? <Spinner animation="grow" />
        : <div className = "user-table"><h1>Homepage</h1><Data data = {data}/> </div>  } 

         
        </>
    )
}

export default User;