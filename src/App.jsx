import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Toast from './components/Toast'
import SplashScreen from './components/SplashScreen'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import useCart from './hooks/useCart'

function AppLayout() {
  const { toast } = useCart()

  return (
    <div className="min-h-screen bg-cream font-body">
      <ScrollProgress />
      <Navbar />
      <Cart />
      <Toast toast={toast} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <BrowserRouter>
      {!ready && <SplashScreen onDone={() => setReady(true)} />}
      <AppLayout />
    </BrowserRouter>
  )
}
