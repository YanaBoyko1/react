import React from 'react';
import { FooterContainer,LogoContainer,FooterContainer2, Branding, Logo, SocialIcons, Copyright } from './Footer.styles';

function Footer() {
  return (
    <FooterContainer>
      <FooterContainer2>
        <Branding>
          <h3>Branding stuff</h3>
          <p>At BoatPro, we believe in delivering only the best. From luxury yachts to rugged fishing boats, our selection is crafted with precision and care</p>
        </Branding>
        <LogoContainer>
          <Logo>BoatPro</Logo>
        </LogoContainer>
        <SocialIcons>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://ua.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </SocialIcons>
      </FooterContainer2>
      <Copyright>2024 BoatPro © All rights reserved</Copyright>
    </FooterContainer>
  );
}

export default Footer;
