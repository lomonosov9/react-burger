import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthorizedSelector} from '../services/selectors';
import { ROUTES } from "../utils/routes";


const ProtectedRouteElement = ({ element, onlyUnAuth = false}) => {
    const isAuthorized = useSelector(isAuthorizedSelector);
    const location = useLocation();
  
    if (onlyUnAuth && isAuthorized) {
      const { from } = location.state || { from: { pathname: ROUTES.CONSTRUCTOR } };
      return <Navigate to={from} />;
    }
  
    if (!onlyUnAuth && !isAuthorized) {
      return (
        <Navigate to={{ pathname: ROUTES.LOGIN }}  state= {{ from: location["pathname"] }} />
      );
    }
  
    return element;
  };

  export default ProtectedRouteElement;