import { Outlet } from 'react-router-dom'
import NavBar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
  

const MainLayout = ({searchText, handleSearchText}) => {
  return (
    <>
        <NavBar searchText={ searchText} handelSearchText={handleSearchText} />
        <ToastContainer />
        <Outlet />
    </>
  )
}

export default MainLayout