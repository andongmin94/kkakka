import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ModeToggle />
          <br /><br /><br />
          <BrowserRouter>
            <Link to="/test/:id">
              <Button>버튼</Button>
            </Link>
          </BrowserRouter>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
