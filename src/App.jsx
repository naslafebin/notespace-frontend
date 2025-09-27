import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotepage from './pages/EditNotepage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const App = () => {

    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [filterText, setFilterText] = useState("")



    const handleFilterText = (val) => {
      setFilterText(val)
    }

    const handleSearchText = (val) => {
      setSearchText(val)
    }

    const filteredNotes = 
    filterText === "BUSINESS" 
    ? notes.filter((note) => note.category == "BUSINESS") 
    : filterText == "PERSONAL" ? notes.filter((note) => note.category == "PERSONAL") 
    : filterText == "IMPORTANT" ? notes.filter((note) => note.category == "IMPORTANT")
    : notes


    useEffect(() => {
      if(searchText.length < 3) return;
      axios.get(`https://notespacebackend-6svm.onrender.com/search-notes/?search=${searchText}`)
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
      .catch(err => console.log(err.message))
    },[searchText])

    useEffect(() => {
      setIsLoading(true)
      axios.get("https://notespacebackend-6svm.onrender.com/notes")
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err.message)
      })
    }, [])

    const addNote = (data) => {
      axios.post("https://notespacebackend-6svm.onrender.com/notes", data)
      .then(res => {
        setNotes([...notes, data])
        toast.success("A new note has been added")
        console.log(res.data)
      })
      .catch(err => {
        console.log(console.log(err.message))
      })
    }

    const updateNote = (data, slug) => {
      axios.put(`https://notespacebackend-6svm.onrender.com/notes/${slug}`, data)
      .then(res => {
        console.log(res.data)
        toast.success("Note updated successfully")
      })
      .catch(err => {
        console.log(err.message)
      })
    }

    const deleteNote = (slug) => {
      axios.delete(`https://notespacebackend-6svm.onrender.com/notes/${slug}`)
      .then(res => {
        setNotes([...notes])
      })
      .catch(err => console.log(err.message))
    }


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout searchText = {searchText} handleSearchText={handleSearchText} />} >
      <Route 
       index
       element = {
       <HomePage notes={filteredNotes}
        loading = {isLoading} 
        handleFilterText = {handleFilterText} />
        }
      />

      <Route path="/add-notes" element = {<AddNotePage addNote={addNote} />} />
      <Route path="/edit-note/:slug" element = {<EditNotepage updateNote = {updateNote} />} />
      <Route path="/notes/:slug" element = {<NoteDetailPage deleteNote = {deleteNote} />} />

    </Route>
  ))

  return <RouterProvider router={router} />
  
}

export default App