import React from 'react'

const Persons = (props) => { 
    return (
        <div>
            {props.personsFilter.map(x =>
            <p key={x.id}> {x.name} {x.number} {" "}
                    <button onClick={() => props.deletePerson(x.name, x.id)}>delete</button></p>
            )}
        </div>
    )
}

export default Persons
