import "./styles.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ProductList from "./components/productList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>
    </div>
  );
}
