import React from 'react';
import styled from 'styled-components';
import bannerImg from '../public/pexels-ylanite-koppens-612825.jpg';
import './componentStyles/Banner.css';

const Container = styled.div`
  /* Empty for now */
`;

const Group17Wrapper = styled.div`
  /* Empty for now */
`;

const BackgroundImage = styled.img`
  /* Empty for now */
`;

const ContentWrapper = styled.div`
  /* Empty for now */
`;

const Button = styled.button`
  /* Empty for now */
`;

const Description = styled.span`
  /* Empty for now */
`;

const SpecialDeals = styled.span`
  /* Empty for now */
`;

const Logo = styled.div`
  /* Empty for now */
`;

const BlackText = styled.span`
  /* Empty for now */
`;

const YellowText = styled.span`
  /* Empty for now */
`;

const Group17 = (props) => {
  return (
    <Container className="group17-container">
      <Group17Wrapper className="group17-group17">
        <BackgroundImage
          className="group17-pexelsylanitekoppens6128251"
          src={bannerImg}
          alt="pexelsylanitekoppens61282511634"
        />
        <ContentWrapper className="group17-group5">
        <a href="#" class="animated-button1">
  <span></span>
  <span></span>
  <span></span>
  <span></span>See Collection</a>
          <Description className="group17-text02">
            Click the button to have various offers and gifts
          </Description>
          <SpecialDeals className="group17-text07">Special Deals</SpecialDeals>
          <Logo className="group17-text09">
            <BlackText className="group17-text10">MED</BlackText>
            <YellowText className="group17-text11">HIVE</YellowText>
          </Logo>
        </ContentWrapper>
      </Group17Wrapper>
    </Container>
  );
};
export default Group17;
