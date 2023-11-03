import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import TaskInfo from './pages/TaskInfo';
import CreateTask from './pages/CreateTask';
import { ProtectedRoute } from './utils/ProtectedRoute';
export default function App() {
  return (
    <Routes>
      <Route path='/' element={ <Login/>} />
      <Route path='/signup' element={ <SignUp/>} />
      <Route path='/tasks' element={ <ProtectedRoute/> }>
          <Route path='' element={ <Tasks /> }/>
          <Route path='create' element={ <CreateTask /> }/>
          <Route path='info/:id' element={ <TaskInfo /> }/>
          <Route path='update/:id' element={ <TaskInfo /> }/>
      </Route>
    </Routes>
  )
}