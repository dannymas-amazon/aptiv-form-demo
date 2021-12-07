import aptivLogo from '../../aptivLogo.png';
import './App.css';
import Form1 from '../Forms/Form1'
import Home from '../Home/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/form1" element={<Form1/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
