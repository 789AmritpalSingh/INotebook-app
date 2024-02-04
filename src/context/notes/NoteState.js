import NoteContext from "./NoteContext";
import {  useState } from "react";

const NoteState  = (props) =>{
    // const state1 = { // initially state will be this
    //     "name": "Amrit",
    //     "class": "12"
    // }

    // const [state,setState] = useState(state1)

    // const modify = ()=>{ // state will change after 2 seconds
    //     setTimeout(()=>{
    //         setState({
    //             "name": "Divya",
    //             "class": "10"
    //         })
    //     },2000)
    // }
    
    const host = "http://localhost:5000"
    const notesInitial = []
    
    const [notes,setNotes] = useState(notesInitial)  

    // Get all Notes
    const getNotes = async() =>{
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note

    const addNote = async(title,description,tag) =>{ // we are adding details for title, description and tag also we are setting default
        // as value, rest like date, user, id will be added automatically
        // API call

        const response = await fetch(`${host}/api/notes/addnote`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                 "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        })
          const note = await response.json()
          setNotes(notes.concat(note)) // adding more notes to existing notes
    }

    // Deleting a note
    const deleteNote = async(id)=>{
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        console.log(json)

        const newNotes = notes.filter((note)=>{return note._id!==id}) 
        setNotes(newNotes)
        //The filter method iterates over each note in the notes array. For each note, it checks if the _id of the note matches the provided id argument. If the _id matches the id argument, the condition note._id !== id will evaluate to false, and that specific note will be excluded from the new array (newNotes). If the _id does not match the id argument, the condition will evaluate to true, and that note will be included in the new array (newNotes).
        
    }

    // Editing a Note
    const editNote = async(id,title,description,tag) =>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()
        console.log(json)


        // let newNotes = JSON.parse(JSON.stringify(notes))
        // // Logic for displaying updated notes in client side, i.e. on the webpage
        // for(let index = 0;index<newNotes.length;index++){
        //     const element = newNotes[index]
        //     if(element._id===id){
        //         newNotes[index].title =title
        //         newNotes[index].description = description
        //         newNotes[index].tag = tag
        //         break
        //     }
        // }
        //setNotes(newNotes)
        getNotes() // alternative for above code
    }

    return (
        // <NoteContext.Provider value = {{state:state, update:modify}}>
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState