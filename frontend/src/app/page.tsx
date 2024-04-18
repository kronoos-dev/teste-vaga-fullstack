"use client"
import Table from "@/components/tabela";
import { Provider } from "react-redux";
import { store } from "../store"; // Importe o store Redux
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <Provider store={store}>
      <Header />
        <Table />
      <Footer />
    </Provider>
  );
}
