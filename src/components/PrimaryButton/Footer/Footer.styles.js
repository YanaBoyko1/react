import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  padding: 40px 20px;
  background-color: white;
  width: 100%;
  position: relative;
  background-color: rgba(243, 248, 251, 1);
`;

export const FooterContainer2 = styled.footer`
  margin-bottom: 100px;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  margin-right: 10px; 
`;

export const Branding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 340px;
  margin-bottom: 100px;
  margin-left: 50px;

  h3 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-top: 4px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-top: -200px;
`;

export const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: rgba(70, 62, 135, 1);
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: -30px;
  padding-left: 980px;
  
  
  i {
    font-size: 23px;
    color: black;
    cursor: pointer;

    &:hover {
      color: rgba(238, 170, 214, 1);
    }
  }
`;

export const Copyright = styled.div`
  font-size: 12px;
  text-align: center;
  border-top: 2px solid black;
  padding-top: 40px;
  padding-bottom: -10px;
  width: 80%;
  margin: 0 auto;
  font-weight: 700;
  font-size: 14px;
`;
