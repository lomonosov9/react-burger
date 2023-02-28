import { Provider } from "react-redux";
import App from './components/app/app';
import { configureStore } from "./services/store";

const store = configureStore()

export const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
