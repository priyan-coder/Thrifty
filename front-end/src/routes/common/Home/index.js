import Directory from '../../../components/Directory';
import { Outlet } from 'react-router-dom';
import { categories } from '../../../mockData/MockData';
const Home = () => {
  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
