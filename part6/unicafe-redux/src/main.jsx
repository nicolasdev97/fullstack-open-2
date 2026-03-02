import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import App from "./App";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App store={store} />);
};

renderApp();
store.subscribe(renderApp);
