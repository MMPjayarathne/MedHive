import styled from "styled-components";
import { categories } from "./CategoryData";

import CategoryItem from "./CategoryItem";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding-top:20px;
  padding-left:80px;
  padding-right:80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;



const Categories = () => {

  const [Items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/category`
        );
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);


  return (
    <>
      <TitleContainer>
        <Typography variant="h4" component="h2" gutterBottom>
          Shop By Categories
        </Typography>
      </TitleContainer>
      <Container>
        {Items.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
