import React, {}  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";





const Protected = ({component : Component, ...rest}) =>{
    //  If Auth is Available Redirect User to Home else to Login Page
     const isUser =   JSON.parse( localStorage.getItem( "auth") )

     return(
        <>
        <Route
        {...rest}
        render = {props =>{
            if (isUser) {
                return <Component {...props}/>
            }else{
                return (
                    <Redirect
                    to = {{
                        pathname : '/',
                        state : {
                            from: props.location
                        }
                    }}
                />
                )
                
            }
        }}
        
        
        
        ></Route>
           
    
         
      
        
        </>
     )

}




export default withRouter(Protected) ;

