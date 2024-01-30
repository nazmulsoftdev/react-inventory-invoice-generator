import "./App.css";
import NavHeader from "./components/NavHeader";
import InvoiceDetailsPage from "./components/InvoiceDetailsPage";

export default function App() {
  return (
    <main className="max-w-7xl mx-auto ">
      <NavHeader />
      <InvoiceDetailsPage />
    </main>
  );
}
