
import React from "react";
import styled from "styled-components";

const PaddedWrapper = styled.div<{ p?: string }>`
  padding: ${({ p }) => p || 0};
`

const Padded: React.FC = ({ children }) => {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
};

export default Padded;
