import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux'
// import { store } from './store.js'
import { store } from './store'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'





// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//       <App />
//     </React.StrictMode>
// )
// // <Provider store={store}>
//   {/* </Provider>, */}
