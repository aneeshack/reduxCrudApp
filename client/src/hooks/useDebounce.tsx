import { useEffect, useState } from "react"


const useDebounce = (value:string, delay:number) => {
    const [ debounceValue, setDebounceValue ] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value)
            console.log('debounce is working')
        },delay)
        return ()=>{
            clearTimeout(handler)
          }
    },[value, delay])

    return debounceValue;
}

export default useDebounce