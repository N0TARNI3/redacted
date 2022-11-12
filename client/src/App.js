import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import SignUpType from "./components/SignUpType";
import SignUp from "./components/SignUp";
import FileUpload from "./components/FileUpload";
import Results from "./components/Results";

function App() {
  return (
    <div className='content'>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup-type" element={<SignUpType/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/upload" element={<FileUpload/>}/>
            <Route path="/results" element={<Results/>} render={(props) => <Results {...props}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}


export default App; 