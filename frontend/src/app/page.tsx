"use client"
import Table from "@/components/tabela";
import { Provider } from "react-redux";
import { store } from "../store"; // Importe o store Redux
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Preenche a altura total da janela do navegador */
`;

const ContentWrapper = styled.div`
  flex: 1; /* Ocupa todo o espaço disponível no contêiner */
  overflow-y: auto; /* Adiciona uma barra de rolagem vertical quando necessário */
`;

export default function Home() {
  return (
    <Provider store={store}>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Table />
        </ContentWrapper>
        <Footer />
      </PageContainer>
    </Provider>
  );
}
