import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
   

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding-top:20px;
  padding-left:60px;
  padding-right:60px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;


    
`;

const Products = ({ items }) => {
  return (
    <Container>
      {items.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;