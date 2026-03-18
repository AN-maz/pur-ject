import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layouts/PublicLayout';

import Home from './pages/Home'
import GalleryPage from './pages/Home/Gallery';
import About from './pages/About';
import SquadDetail from './pages/About/Structure/SquadDetail';
import Merchant from './pages/Merchant';

import Login from './pages/auth/Login'
import Registrasi from './pages/auth/Registrasi'

import UserDashboard from './pages/Dashboard/User/Dashboard';
import AgendaList from './pages/Dashboard/User/Agenda';
import AgendaDetail from './pages/Dashboard/User/Agenda/Detail';

import AdminDashboard from './pages/Dashboard/Admin/Dashboard';
import AdminAgendaList from './pages/Dashboard/Admin/Agenda';
import AdminAgendaDetail from './pages/Dashboard/Admin/Agenda/Detail';

import DashboardLayout from './components/Layouts/DashboardLayout';

import InternalDashboard from './pages/Dashboard/Admin_internal/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home/gallery' element={<GalleryPage />} />
          <Route path='/about' element={<About />} />
          <Route path="/about/squad/:divisionId" element={<SquadDetail />} />
          <Route path='/merchant' element={<Merchant />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registrasi />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          {/* ROUTE USER */}
          {/* <Route index element={<Navigate to="user" replace />} /> */}
          <Route path="user" element={<UserDashboard />} />
          <Route path="agenda" element={<AgendaList />} />
          <Route path="agenda/:id" element={<AgendaDetail />} />

          {/* ROUTE ADMIN DIVISI */}
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/agenda' element={<AdminAgendaList />} />
          <Route path='admin/agenda/:id' element={<AdminAgendaDetail />} />

          {/* ROUTE ADMIN HUMANIORA INTERNAL */}
          <Route path='internal' element={<InternalDashboard/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App