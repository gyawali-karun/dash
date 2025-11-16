import "./App.css";
import Sidebar from "./components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DataTable from "./pages/DataTablePage";
import HomePage from "./pages/HomPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/data" element={<DataTable />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
