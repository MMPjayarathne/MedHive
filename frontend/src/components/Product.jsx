import {
    LocalMall,
    LocalMallOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@mui/icons-material";
  import styled from "styled-components";
  import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import Cookies from 'js-cookie';

  const OuterContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  
`;

  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 3px;
    min-width: 280px;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
  
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 90%;
    width: auto;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #c2efef;
      transform: scale(1.2);
    }
  `;
  const Description = styled.div`
  // Adjust the styles to position the description and price in a row
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;
  
  const Product = ({ item }) => {
    const [token] = useState(Cookies.get('token') || '');

    const handleProductClick = () => {
      // Use the Link component to navigate to the product page
      window.location.href = `/product?productId=${item._id}`;
    };

    const handleAddToCart = async () =>{
      try{
            if (item._id) {
              const productId = item._id;
              const productQuntity = 1;
              const response = await axios.post(
                'http://localhost:8080/api/v1/cart/addCart',
                {
                  productId: productId,
                  quantity: productQuntity,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                console.log('Success adding the item');
                window.location.href = `/cart`;
              } else {
                console.log('There is an error in adding the item');
              }
            }
            
          }catch(error){
            console.log("The error: ",error);
          }

    };
  

    const src = "http://localhost:8080/" +item.Image1.replace(/\\/g, "/");
    return (
      <>
        <OuterContainer>
            <Container>
                <Circle />
                <Image src={src} />
                <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={handleAddToCart}/>
                </Icon>
                <Icon>
                    <SearchOutlined onClick={handleProductClick} />
                </Icon>
                <Icon>
                    <LocalMallOutlined/>
                </Icon>
                </Info>
            </Container>
            <Description>
                    <h3>{item.Brand}</h3>
                    <p>({item.Name})</p>
                    <p> <br/>Rs.{item.Price}</p>
                </Description>
    </OuterContainer>
    </>
    );
  };
  
  export default Product;
