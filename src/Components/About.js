import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import NoteContext from '../context/notes/NoteContext'

const About = () => {
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) { // if token is present in localStorage then show About page , it can happen only if user is logged in , because after logging in only he can get the token
      <About />
    } else {
      navigate('/login') // else user is redirected to login page and can't open any other page like Home or About without logging in 
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container my-5">
      <h2 className="mb-4">About iNotebook</h2>
      <p>Welcome to iNotebook, your personal note management solution that prioritizes both ease of use and data security. With iNotebook, you can focus on capturing your ideas while having the peace of mind that your notes are protected and accessible only to you.</p>

      <h4 className="mt-4">Key Features:</h4>
      <ul>
        <li>Effortless Note Management</li>
        <li>Cloud-Based Storage</li>
        <li>Robust Privacy Controls</li>
        <li>Customizable Organization</li>
        <li>Real-Time Sync</li>
        <li>User-Friendly Collaboration</li>
        <li>Efficient Search</li>
      </ul>

      <h4 className="mt-4">Getting Started:</h4>
      <ol>
        <li>Sign Up: Create your iNotebook account with a unique username and password.</li>
        <li>Log In: Access your personalized note-taking environment by logging in with your credentials.</li>
        <li>Create Notes: Start by crafting new notes, adding titles, content, and labels.</li>
        <li>Edit and Delete: Easily edit and update your notes. Delete notes when they are no longer needed.</li>
        <li>Organize: Keep your notes organized using folders or labels.</li>
        <li>Cloud Access: Access your notes from any device with an internet connection.</li>
        <li>Collaborate (Optional): Share notes and collaborate with others on projects.</li>
      </ol>

      <p className="mt-4">Experience the convenience, security, and versatility of iNotebook. Streamline your note-taking process and elevate your organization with a platform designed to meet your unique needs. Start your journey with iNotebook today and take control of your digital note-taking experience.</p>
    </div>
  );
}

export default About
