import React from 'react'
import { Link } from 'react-router-dom'

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.availableCopies}</td>
            <td>{props.term.category}</td>
            <td >{props.term.author.name + " " + props.term.author.surname}</td>
            <td className={'text-right'}>
                <button title={"Delete"} 
                   className={"btn btn-danger"} 
                   onClick={() => props.onDelete(props.term.id)}> 
                Delete
                </button>
                <Link className={"btn btn-primary ml-2"} 
                  onClick={() => props.onEdit(props.term.id)} 
                  to={`/books/edit/${props.term.id}`}>Edit</Link>
                  <button title={"Mark As Taken"}
                   disabled={props.term.availableCopies === 0} 
                   className={"btn btn-success"} 
                   onClick={() => props.markAsTaken(props.term.id)}> 
                Mark As Taken
                </button>
            </td>
            

        </tr>
    )
}

export default bookTerm;