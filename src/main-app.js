import { Provider } from "react-redux";
import App from './components/app/app';
import { configureStore } from "./services/store";
import { BrowserRouter } from "react-router-dom";


const store = configureStore()

export const MainApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
