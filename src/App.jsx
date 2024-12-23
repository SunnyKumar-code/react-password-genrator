import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'


function App() {
 const [password , setPasword]=useState("");
 const [length , setLength]=useState(8);
 const [number , setNumber]=useState(false);
 const [symble , setSysble]=useState(false);
 const refText = useRef(null)

 const passwordGenrator =useCallback(()=>{
  let pass =""
  let str = "ABCDEFGHIJKLMNOPQRESTUVWXYZabcdefghijklmnopqrestuvwxyz"
  if(number) str+="0123456789";
  if(symble) str+="~!@#$%^*(&)_+{}";
  for(let i = 1 ; i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
setPasword(pass)
 },[length,number,symble]) 

useEffect(()=>{
  passwordGenrator()
},[
  length , symble,number
])
const copypassword=useCallback( ()=>{
  refText.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])
  return (
    <>
      <div>
        <input type="text" value={password} ref={refText} readOnly />
        <button onClick={copypassword}>copy</button>
      </div>
      <input type="range" value={length} 
      onChange={(e)=>setLength(e.target.value)}
      min={8} max={20} />
      <div className='item'>
      <label>Length:{length}</label>
      
      <label><input type="checkbox" onClick={()=>{
        setNumber(!number)
      }} />:Number</label>
      
      <label><input type="checkbox" onClick={()=>setSysble(!symble)} />:Symbol</label>
      </div>
     
    </>
  )
}

export default App
