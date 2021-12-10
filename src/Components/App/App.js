import './App.css';
import Form1 from '../Forms/Form1'
import Home from '../Home/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/defectForm" element={<Form1/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
