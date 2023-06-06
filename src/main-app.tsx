import { Provider } from "react-redux";
import App from './components/app/app';
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";


export const MainApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
