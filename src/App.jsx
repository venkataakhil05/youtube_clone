import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import store from "./utils/store";
import VideoContainer from "./components/VideoContainer";
import WatchPage from "./components/watchcard";

import SearchPage from "./components/SearchPage";
import HistoryPage from "./components/HistoryPage";

// Layout Component
const AppLayout = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <Body />
      </div>
    </Provider>
  );
};

// Router Configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <div id="main-content" className="flex-1 overflow-y-auto p-4"><VideoContainer /></div>,
      },
      {
        path: "watch/:id",
        element: <div className="flex-1 overflow-y-auto w-full"><WatchPage /></div>,
      },
      {
        path: "results",
        element: <div className="flex-1 overflow-y-auto w-full"><SearchPage /></div>,
      },
      {
        path: "history",
        element: <div className="flex-1 overflow-y-auto w-full"><HistoryPage /></div>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
