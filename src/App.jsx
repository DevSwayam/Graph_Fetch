import { useState, useEffect } from 'react';
import {createClient} from "urql"; // to create url
import './App.css'

function App() {
const [tokens,setTokens]=useState([]);
const QuerryUrl = "https://gateway.thegraph.com/api/f66631f0253ae63d6928c421c4300dd6/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
const query = `{
  tokens(first: 5) {
    id
    name
    symbol
    decimals
  }
}`;
const client = createClient({
  url:QuerryUrl
})

useEffect(()=>{
  const getTokens = async()=>{
    const {data} = await client.query(query).toPromise();
    setTokens(data.tokens);
    console.log(data.tokens);
  }
  getTokens();
},[])


  return (
    <>
      <div>
       Token Information  {
        tokens!== null && tokens.length >0 &&tokens.map ((token)=>{
          return(
          <div>
            <div>
              {token.id}
            </div>
            <div>
              {token.name}
            </div>
          </div>
          )
        })
      }
      </div> 
    </>
  )
}

export default App
