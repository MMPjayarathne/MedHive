import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  display: inline-block;
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.5s ease;

  &:hover {
    color: teal;
    transform: scale(1.2);
  }
`;

const CategoryItem = ({ item }) => {
  const handleMedhiveClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = `../shop?categoryId=${item.id}`; // Replace with your homepage URL
  };


  const src = "http://localhost:8080/" +item.Image.replace(/\\/g, "/");;


  console.log(item.id)
  return (
    <Container>
      <Image src={src} />
      <Info>
        <Title>{item.Name}</Title>
        <Link >
          <Button onClick={handleMedhiveClick}>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
