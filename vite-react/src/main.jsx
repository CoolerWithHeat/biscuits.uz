import { createRoot } from 'react-dom/client'
import Main_interface from './components/main'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeContent from './components/home';
import { Provider } from 'react-redux';
import store from './store/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="React/Home/" element={<HomeContent/>}></Route>
        <Route path="React/Main/" element={<Main_interface/>}></Route>
        <Route path="*" element={<Navigate to="/React/Home" replace />} />
      </Routes>
    </Router>
  </Provider>,
);