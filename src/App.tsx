import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Lazy loading the components
const Login = lazy(() => import("./pages/login"));
const Tasks = lazy(() => import("./pages/tasks"));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
          toastStyle={{
            width: "300px",
            fontSize: "14px",
            borderRadius: "8px",
          }}
        />
        <BrowserRouter>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              {/* Route for Login */}
              <Route path="/login" element={<Login />} />

              {/* Route for Tasks */}
              <Route path="/" element={<Tasks />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
