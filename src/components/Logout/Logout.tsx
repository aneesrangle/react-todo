import { useAuth } from '../../contexts/AuthContext';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
