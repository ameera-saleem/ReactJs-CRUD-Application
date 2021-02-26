import { useEffect } from "react"
import React , {useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'



// View the Currend User using Params
const View = () =>{
    const [loader, setLoader] = useState(false)
    const history = useHistory()
    const {name} = useParams()
    const [data, setData] = useState ()
    useEffect(() => {
        (async function() {
            try {
                const response = await fetch(
                    'http://localhost:3003/users'
                );
                const json = await response.json();
               setData(json)
               setLoader(true)
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    
   
    return(
        <>
      {!loader ? <Spinner animation="grow" />: 
        <div className="view-wrapper">
        { data && data.filter(users=> users.name === name).map((data,index) =>{
          return <section key = {index}><h1>Welcome {data.name}</h1>
          <ul>
              <li>Username : {data.username}</li>
              <li>Email : {data.email}</li>
              <li>Phone Number : {data.phone}</li>
              <li>Website: {data.website}</li>
              <li>User # : {data.id}</li>
              <Button onClick = {() =>{history.push('/home')}} variant="danger">Back to home</Button>
              
          </ul>
          </section>
  
      
      })}
           
          </div>
      }
        </>
    )
}


export default View;