import React from "react";
import styled from "styled-components";

import Header from "./partials/Header";
import Footer from "./partials/Footer";

const AppLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutWrapper>
  );
};

export default AppLayout;

export const getAppLayout = (page) => {
  return (
    <AppLayout>
      <>{page}</>
    </AppLayout>
  );
};

const LayoutWrapper = styled.div`
  max-width: var(--max-width);
  width: 100%;
  /* padding: 0 24px; */
  margin: 0 auto;
  height: 100vh;
  /* position: relative; */

  > main {
    min-height: 75vh;
    padding: 0 24px;
  }
`;
