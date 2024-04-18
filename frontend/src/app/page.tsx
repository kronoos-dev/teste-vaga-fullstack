"use client"
import Table from "@/components/tabela";
import { Provider } from "react-redux";
import { store } from "../store"; // Importe o store Redux

export default function Home() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  );
}
