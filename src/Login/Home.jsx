import React, {useEffect, useState} from 'react';
import User from './User';





// Home is the Protected Route And Fetching Data
const Home = ()=>{
    const [loader, setLoader] = useState(false)
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
        <User 
        loader = {loader}
        data = {data}
        />
        
        </>
    )
}


export default Home