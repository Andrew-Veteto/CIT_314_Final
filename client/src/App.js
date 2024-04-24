import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../src/pages/Main/Main'
import StateDetailPage from '../src/pages/StateDetailPage/StateDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import ParkDetailPage from './pages/ParkDetailPage/ParkDetailPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/logout' element={<LogoutPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/state/:state' element={<StateDetailPage/>}/>
          <Route path='/park/:name' element={<ParkDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;