import "./App.css";
// import router from './routes/AppRoutes';
// import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecentActivity from "./components/RecentActivity";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}
      <RecentActivity />
    </QueryClientProvider>
  );
}

export default App;
