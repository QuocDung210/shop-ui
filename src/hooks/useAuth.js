import { useSelector } from 'react-redux';

const useAuth = () => {
    const auth = useSelector((state) => state.auth.login.currentUser);
    return auth;
};

export default useAuth;
