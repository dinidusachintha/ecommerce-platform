import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from '../Pages/User';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;