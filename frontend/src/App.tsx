import { BrowserRouter, Route, Routes } from 'react-router'; 
import './App.css'; 
import DummyNav from './DummyNav'; // Navigation component
import Home from './dummy-pages/Home'; // Home page component
import Page1 from './dummy-pages/Page1'; // Page 1 component
import Page2 from './dummy-pages/Page2'; // Page 2 component

function App() {
  return (
    <>
      {/* Setting up React Router for client-side navigation */}
      <BrowserRouter>
        {/* Persistent navigation bar across all pages */}
        <DummyNav />

        {/* Defining routes for different pages */}
        <Routes>
          <Route path='/' element={<Home />} /> {/* Default home page */}
          <Route path='/page1' element={<Page1 />} /> {/* Page 1 route */}
          <Route path='/page2' element={<Page2 />} /> {/* Page 2 route */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
