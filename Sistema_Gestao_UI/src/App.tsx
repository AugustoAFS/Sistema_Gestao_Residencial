import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Categoria from './pages/categoria/Categoria';
import Pessoa from './pages/pessoas/Pessoa';
import Transacao from './pages/transacoes/Transacao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout envolve todas as rotas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="categoria" element={<Categoria />} />
          <Route path="pessoa" element={<Pessoa />} />
          <Route path="transacao" element={<Transacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
