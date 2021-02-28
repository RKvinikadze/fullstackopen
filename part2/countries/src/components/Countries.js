import React, {useState} from "react"
import Country from './Country'


const Countries = (props) => {
    const [showHide, setShowHide] = useState(new Array(props.countries.length).fill(false))

    const ShowHide = (key) => {
    var arr = [...showHide]
    arr[key] = !arr[key]
    setShowHide(arr)
    }


    return (
    <div>
        {
        props.countries.map((country, i)=>{
            return <div key={i}>
                <p key={i}>{country.name} <button onClick={()=>ShowHide(i)}>{showHide[i]?"hide":"show"}</button></p>
                {
                showHide[i]? <Country country={country}/>:''
                }
            </div>
        })
        }
    </div>
    )  
}

export default Countries