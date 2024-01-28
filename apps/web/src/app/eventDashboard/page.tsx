import '../dashboard.css';
import Sidebar from '../../components/Sidebar';
import MainDashboard from '../../components/mainDashboard';

export default function EventDashboard() {
  return (
    <>
      <div className="appGlass">
        <Sidebar />
        <MainDashboard />
        <div>c</div>
      </div>
    </>
  );
}
