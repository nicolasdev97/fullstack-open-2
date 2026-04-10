import ReactDOM from "react-dom/client"
import App from "./App"
import { UserContextProvider } from "./contexts/UserContext"
import { NotificationContextProvider } from "./contexts/NotificationContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>
)

// Made with Zustand

// User credentials for testing:
// user: juan
// password: 12345
