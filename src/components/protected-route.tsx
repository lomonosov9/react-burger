import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthorizedSelector} from '../services/selectors';
import { ROUTES } from "../utils/routes";

type ProtectedRouteElementProps = {
  element: JSX.Element;
  onlyUnAuth?: boolean;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element, onlyUnAuth = false}) => {
    const isAuthorized = useSelector(isAuthorizedSelector);
    const location = useLocation();
  
    if (onlyUnAuth && isAuthorized) {
      const { from } = location.state || { from: { pathname: ROUTES.CONSTRUCTOR } };
      const navigateToPath = from === ROUTES.PROFILE_LOGOUT ? ROUTES.CONSTRUCTOR : from;
      return <Navigate to={navigateToPath} />;
    }
  
    if (!onlyUnAuth && !isAuthorized) {
      return (
        <Navigate to={{ pathname: ROUTES.LOGIN }}  state= {{ from: location["pathname"] }} />
      );
    }
  
    return element;
  };

  export default ProtectedRouteElement;