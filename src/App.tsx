/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './App.css'

type CallbackHandler = {
  (): void
};

interface Animal {
  id: number,
  type: string,
  age: string | number,
  name: string
}

function useAnimal() {

  const [animal, setAnimal] = useState<Animal[]>([]);

  const search = async (q: string) => {
    const result = await fetch("http://localhost:8000?" + new URLSearchParams({ q }));
    const jsonResult = await result.json();
    localStorage.setItem('q', q);
    setAnimal(jsonResult);
  }

  return {animal, search};

}


function App() {
  const [value, setValue] = useState<string>("");
  const [timing, setTiming] = useState<number>(0);
  const {animal, search} = useAnimal();

  const delaySearch = (value: string) => {
    setValue(value);
    delay(() => search(value));
  }
  
  const delay = (func: CallbackHandler) => {
    clearTimeout(timing); 
  
    const TIMEOUT = setTimeout(() => {
      func();
    }, 1000)

    setTiming(TIMEOUT);
  }

  useEffect(() => {
    const getCache: string = localStorage.getItem('q')?.toString() || "";
    setValue(getCache);
    search(getCache);
  }, [])

  return (
    <>
      <h1>Animal Search</h1>
      <input type="text" value={value} onChange={(e) => delaySearch(e.target.value.toString())}/>

      <ul>
        {animal.map(anim => <li key={anim.id}> <strong>{anim.type}</strong> {anim.name} </li>)}
      </ul>

      {animal.length <= 0 &&  <p>No animal found</p>}
    </>
    
  )
}

export default App
