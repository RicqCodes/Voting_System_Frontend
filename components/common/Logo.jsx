import Link from "next/link";
import styled from "styled-components";

const Logo = ({ className }) => {
  return (
    <LogoContainer className={className}>
      <Link href="/">
        <p>Vote Dapp</p>
      </Link>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  font-size: 30px;
  font-weight: 600;
`;
