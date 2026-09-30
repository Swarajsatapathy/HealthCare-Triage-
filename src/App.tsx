
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Dashboard } from './Dashboard';
import { PatientIntake } from './PatientIntake';
import { CaseReview } from './CaseReview';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="intake" element={<PatientIntake />} />
          <Route path="review/:patientId" element={<CaseReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
