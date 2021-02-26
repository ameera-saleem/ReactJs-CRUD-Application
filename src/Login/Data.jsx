import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import axios from 'axios'




// CRUD from Showing Data to Edting,Deleting and Updating Data
const Data =  ({data})=>{

   // Error Handing and Getting User Value 
   const [empty, setEmpty] = useState(false)
   const [modalShow, setModalShow] = useState(false);
    const [value, setValue] = useState({
        email: '',
        username: '',
        name: '',
        phone : '',
        website : ''
      })


      const inputValue = (event) =>{
        const {name, value} = event.target
        setValue((prevData) =>{
          return {...prevData,
            [name] : value}
        })
    }

   //  Get the ID and Delete the current Data
   const deleteUser = async id =>{
      await axios.delete(`http://localhost:3003/users/${id}`)
       window.location.reload()
   }


    //  Get the ID and Update the current Data
   const editUser = (id) =>{
      data.filter(users=> users.id === id).map((data) =>{
      return setValue(data)
      
     })
     setModalShow(true)
   }

   // On clickeing Put request will be send
   const addEdit = async () =>{
      if(value === ''){
         setEmpty(true)
         setTimeout(() => {
           setEmpty(false)
         }, 1000);
         return ;
       }
      const newId = value.id
      await axios.put(`http://localhost:3003/users/${newId}`, value)
      window.location.reload()
   }
   
   // MApping through users data and showing it
   const users = data && data.map((data)=>{
      return  <tbody key = {data.id} >
        <tr>
          <td>{data.name}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>
          {/* for useParams */}
          <td className = "btn">
          <Link to = {`/home/view/${data.name}`}><Button variant="primary">View</Button></Link>
          <Button onClick = {()=> editUser(data.id)} variant="secondary">Edit</Button>
          <Button onClick = {()=> deleteUser(data.id)} variant="danger">Delete</Button>
          </td>
           </tr>
          </tbody>

     })
    
    return(
       <>
       {/* Form For Updating User */}
       {modalShow ?  <div className="bg-modal2" >
	    <div className="modal-contents">
	    <div className="close" onClick={() => setModalShow(false)}>+</div>
            <h1>Fill In The Fields</h1>
            <input onChange = {inputValue} value = {value.name} name = "name" type = "text" placeholder = "Name"/>
			   <input onChange = {inputValue} value = {value.username} name = "username"  type = "text" placeholder = "User name"/>
            <input onChange = {inputValue} value = {value.email} name = "email"  type = "email" placeholder = "Email"/>
            <input onChange = {inputValue} value = {value.phone} name = "phone"  type = "tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder = "Phone Number"/>
            <input onChange = {inputValue} value = {value.website} name = "website"  type = "text" placeholder = "website"/>
             <Button onClick = {addEdit}  variant="danger" >Update User</Button> 
             {empty ? <p style = {{color : 'white'}}>Please Fill in your field</p> : null }
	     </div>
        </div> : null}

         <Table striped bordered hover variant="dark"  className = "table">
         <thead >
         <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th >Action </th>
         </tr>
         </thead>
         {users} </Table>
       </>
    )
}


export default Data


