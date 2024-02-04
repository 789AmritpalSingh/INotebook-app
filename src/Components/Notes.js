import React, { useContext, useEffect, useRef, useState } from 'react';

import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(NoteContext);
    let navigate = useNavigate()
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){ // if token is present in localStorage then show notes , it can happen only if user is logged in , because after logging in only he can get the token
            getNotes()
        }else{
            navigate('/login') // else user is redirected to login page and can't open any other page like Home or About without logging in 
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null) //Creates a ref using the useRef hook, which is later used to trigger a modal.
    const refClose = useRef(null) // Creates another ref for closing the modal.
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        
    }

    const handleNoteUpdate = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Note Updated Successfully","success")
    }

    const onChange = (e) => { // used to write and cancel the text
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/* Below modal will appear for editing the note  */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleNoteUpdate} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} /> // adding unique key to every  Note 
                })}
            </div>
        </>

    )
}

export default Notes
