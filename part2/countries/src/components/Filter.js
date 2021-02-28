import React from 'react'
import Country from './Country'
import Countries from './Countries'

const Filter = (props) => {

    if (props.filtered === ''){
        return <p>no data yet</p>
    }
        else if (props.filteredNumber > 10 ){
        return <p>Too many matches </p>
    }else if (props.filteredNumber === 1){
        return <Country country={props.filtered[0]} />
    }else{
        return (
            <div>
                <Countries countries={props.filtered} />
            </div>
        )
    }
}

export default Filter