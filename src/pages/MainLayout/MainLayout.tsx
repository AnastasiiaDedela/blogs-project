import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default MainLayout;
