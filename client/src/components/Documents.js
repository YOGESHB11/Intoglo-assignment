import React ,{useEffect,useState} from 'react'
import axios from 'axios'
// import Documents from './Documents';
const Documents = () => {
    const [docs, setDocs] = useState()
    const sendRequest = async () => {
        const res = await axios.get("https://localhost:5000/getDocs").catch((err)=>console.log(err));
        const data = await res.data
        console.log(data)
        return data
    }
    useEffect(() => {
      sendRequest().then(data=>setDocs(data.docs))
    }, [])
    console.log(docs)
  return (
    <div>
        Docs
    </div>
  )
}

export default Documents