import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthorizedSelector} from '../services/selectors';

const ProtectedRouteElement = ({ element, onlyUnAuth = false}) => {
    const isAuthorized = useSelector(isAuthorizedSelector);
    const location = useLocation();
  
    if (onlyUnAuth && isAuthorized) {
      const { from } = location.state || { from: { pathname: "/" } };
      return <Navigate to={from} />;
    }
  
    if (!onlyUnAuth && !isAuthorized) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      );
    }
  
    return element;
  };

  export default ProtectedRouteElement;