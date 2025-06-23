import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute';
//Components
import LoginPage from './Auth/login';
import SignUpPage from './Auth/SignUp';
import TaskManager from './Pages/TaskManagement';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
