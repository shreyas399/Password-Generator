import { useState, useCallback ,useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength]= useState(12)
  const [numbersAllowed, setnumbrsAllowed]=useState(false)
  const [characterAllowed, setcharacterAllowed]=useState(false)
  const [password, setpassword]=useState()
  //Creating Hooks(state,ref,effect,callback)


  const passwordref =useRef(null)
  //for copy Highlight function


  //generating password function
  const generatePassword = useCallback(() =>
  {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  //for cases like symbols and numbers
    if(numbersAllowed ==true) str += "0123456789"
    if(characterAllowed) str+= "!@#$%^&*()_+"
//loop to iterate random keys
    for(let i=1 ;i<length;i++)
    {
      const char =Math.floor(Math.random() *str.length +1)
      pass+= str.charAt(char)
    }

    //calling setpassword and assigning the generated password
    setpassword(pass)

  }, [length, numbersAllowed, characterAllowed])

  //copy function
  const copyPasswordToClipboard =()=>
  {
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
  }

  //To reflect on any effect in the webpage
  useEffect(() =>
  {
    generatePassword()
  }, [length, characterAllowed, numbersAllowed])
  
//HTML
  return (
   <div>
    
  <h1> Your Password Generator </h1>

  <div>

    
    <input
    type="text"
    value={password}
    placeholder='password'
    readOnly
    ref={passwordref}

    />

    <button onClick={copyPasswordToClipboard}>Copy</button>


  </div>

  <div>
    <div>
      <input 
      type="range"
      min={6}
      max={18}
      value={length}
      onChange={(e) => setlength(e.target.value)}
       />
       <label htmlFor="length"> Length: {length}</label>
    </div>
    <input
    type='checkbox'
    defaultChecked={numbersAllowed}
    onChange={() =>
    {
      setnumbrsAllowed((prev)=> !prev)
    }}
    />
    <label htmlFor='number'> Numbers</label>


    <input
    type='checkbox'
    defaultChecked={characterAllowed}
    onChange={() =>
    {
      setcharacterAllowed((prev)=> !prev)
    }}
    />
    <label htmlFor='number'> Character</label>
    
    
    
  </div>

  

   </div>
  )
}

export default App
