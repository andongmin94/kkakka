import "./App.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Link to="/test/:id">
            <Button>asd</Button>
          </Link>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
