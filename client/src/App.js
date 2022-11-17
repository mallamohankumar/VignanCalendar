import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventCal from "./components/EventCal";
import Event from "./components/Event";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Main from "./components/Main";
import Staff from "./components/Staff";
import Student from "./components/Student";
import THome from "./components/THome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="cal" element={<EventCal />} />
          <Route path="form1" element={<Form1 />} />
          <Route path="form2" element={<Form2 />} />
          <Route path="event" element={<Event />} />
          <Route path="staff" element={<Staff />} />
          <Route path="student" element={<Student />} />
          <Route path="thome" element={<THome />} />
      </Routes>
    </BrowserRouter>
  );
}