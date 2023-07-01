import styled from "styled-components";
import { categories } from "./CategoryData";

import CategoryItem from "./CategoryItem";
import { Typography } from "@mui/material";

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
  return (
    <>
      <TitleContainer>
        <Typography variant="h4" component="h2" gutterBottom>
          Shop By Categories
        </Typography>
      </TitleContainer>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
