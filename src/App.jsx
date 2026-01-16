import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App
