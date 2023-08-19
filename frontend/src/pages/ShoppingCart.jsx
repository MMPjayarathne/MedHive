import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBModal, // Import MDBModal component
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  } from "mdb-react-ui-kit";
  import { MDBIcon} from 'mdbreact';
import { ThreeDots } from 'react-loader-spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import SignIn from './SignIn';
import './pageStyles/ShoppingCart.css';

export default function ShoppingCart() {
  const location = useLocation();
  const [URLproductId, setURLproductId] = useState([null]);
  const [URLquantity, setURLquantity] = useState([null]);
  const [Items, setItems] = useState([]);
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Products, setProducts] = useState([]); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const tempURLproductId = new URLSearchParams(location.search).get("productId");
  const tempURLquantity = new URLSearchParams(location.search).get("quantity")
  const navigate = useNavigate();
  
  useEffect(() => {
    setURLproductId(tempURLproductId);
    setURLquantity(tempURLquantity);
    if (token) {
      fetchItems(token);
    }
    
    addItemToCart();
    
  }, [token]);

  
  const addItemToCart = async()=> {
    
      if (URLproductId) {
        const validProductId = URLproductId ? URLproductId.replace(/'/g, '') : null;
        const validquantity = URLquantity ? parseInt(URLquantity) : 0;
        try {
          console.log(URLproductId);
          const response = await axios.post(
            'http://localhost:8080/api/v1/cart/addCart',
            {
              productId: validProductId,
              quantity: validquantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.status === 200) {
            setURLproductId(null);
            setURLquantity(null);
            window.location.href = `/cart`;
            console.log('Success adding the item');
          } else {
            console.log('There is an error in adding the item');
          }
        } catch (error) {
          console.error('Error adding item:', error);
        }
      }
    }
 
  
  


  const fetchItems = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
      setProducts(response.data.productList);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClick = (productId) => {
    setSelectedProductId(productId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setModalIsOpen(false);
  };

  const handleDeleteClick = async () => {

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/cart/deleteCartItem',
        {
          productId: selectedProductId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        closeModal();
        fetchItems(token); // Refresh the cart items after successful deletion
        navigate('/cart'); // Redirect to the cart page
      } else {
        console.log('There is an error in deleting the item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!token) {
    return <SignIn />;
  }
  const productListLength = Items.productList ? Items.productList.length : 0;
  console.log(Items.productList)

  return (
  <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
   {loading ? (
               <div style={{ display: 'flex', justifyContent: 'center',height:'auto', alignItems: 'center',marginTop:'30%' }}>
               <ThreeDots color="#00BFFF" height={100} width={100} />
             </div>
            ) : (
              <>  
          {Items.productList.length ? (
            <MDBContainer className="py-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol size="12">
                  <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                    <MDBCardBody className="p-0">
                      <MDBRow className="g-0">
                        <MDBCol lg="8">
                          <div className="p-5">
                            <div className="d-flex justify-content-between align-items-center mb-5">
                              <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                Shopping Cart
                              </MDBTypography>
                              <MDBTypography className="mb-0 text-muted">
                                {productListLength} items
                              </MDBTypography>
                            </div>
          
                            <hr className="my-4" />

                            {Products.map((product) => (

                            
                              <>
                                <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                  <MDBCol md="2" lg="2" xl="2">
                                    <MDBCardImage
                                      src = {"http://localhost:8080/" + product.image.replace(/\\/g, "/")}
                                      fluid className="rounded-3" alt={product.name} />
                                  </MDBCol>
                                  <MDBCol md="3" lg="3" xl="3">
                                    <MDBTypography tag="h6" className="text-muted">
                                      Item
                                    </MDBTypography>
                                    <MDBTypography tag="h6" className="text-black mb-0">
                                      {product.name}
                                    </MDBTypography>
                                  </MDBCol>
                                  <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                    <MDBBtn color="link" className="px-2">
                                      <MDBIcon fas icon="minus" />
                                    </MDBBtn>
              
                                    <MDBInput type="number" min="0" defaultValue={product.quantity} size="sm" />
              
                                    <MDBBtn color="link" className="px-2">
                                      <MDBIcon fas icon="plus" />
                                    </MDBBtn>
                                  </MDBCol>
                                  <MDBCol md="3" lg="2" xl="2" className="text-end">
                                    <MDBTypography tag="h6" className="mb-0">
                                      Rs. {product.price}
                                    </MDBTypography>
                                  </MDBCol>
                                  <MDBCol md="1" lg="1" xl="1" className="text-end">
                                    <a onClick={() => deleteClick(product.productId)}  className="text-muted">
                                      <MDBIcon fas icon="times" />
                                    </a>
                                  </MDBCol>
                                </MDBRow>

                                <MDBModal color="dark" show={modalIsOpen} onHide={closeModal}>
                                      <MDBModalHeader toggle={closeModal}>Confirm Delete</MDBModalHeader>
                                      <MDBModalBody>
                                        Are you sure you want to delete this item?
                                      </MDBModalBody>
                                      <MDBModalFooter>
                                        <button onClick={() => handleDeleteClick(selectedProductId)}>Delete</button>
                                        <button onClick={closeModal}>Cancel</button>
                                      </MDBModalFooter>
                                    </MDBModal>

              
                                <hr className="my-4" />
                                </>
                                ))}
          
                          
          
                          
          
        
                            <div className="pt-5">
                              <MDBTypography tag="h6" className="mb-0">
                                <MDBCardText tag="a" href="/home" className="text-body">
                                  <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                  to shop
                                </MDBCardText>
                              </MDBTypography>
                            </div>
                          </div>
                        </MDBCol>
                        <MDBCol lg="4" className="bg-grey">
                          <div className="p-5">
                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                              Summary
                            </MDBTypography>
          
                            <hr className="my-4" />
          
                            <div className="d-flex justify-content-between mb-4">
                              <MDBTypography tag="h5" className="text-uppercase">
                                items {Items.productList.length}
                              </MDBTypography>
                              <MDBTypography tag="h5">Rs. {Items.totalPrice} /=</MDBTypography>
                            </div>
          
                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                              Shipping
                            </MDBTypography>
          
                            <div className="mb-4 pb-2">
                              <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                                <option value="1">Standard-Delivery- €5.00</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                              </select>
                            </div>
          
                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                              Give code
                            </MDBTypography>
          
                            <div className="mb-5">
                              <MDBInput size="lg" label="Enter your code" />
                            </div>
          
                            <hr className="my-4" />
          
                            <div className="d-flex justify-content-between mb-5">
                              <MDBTypography tag="h5" className="text-uppercase">
                                Total price
                              </MDBTypography>
                              <MDBTypography tag="h5">Rs. {Items.totalPrice} /=</MDBTypography>
                            </div>
                            <MDBBtn color="dark" block size="lg">
                              Register
                            </MDBBtn>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>


            </MDBContainer>

            
          ):(

            <MDBContainer className="py-5 h-100">
              <div className="p-5 text-center">
                <MDBIcon fas icon="shopping-cart" size="10x" className="mb-4 text-muted" />
                <MDBTypography tag="h1" className="fw-bold mb-3 text-black">
                  Your Cart is Empty
                </MDBTypography>

                <MDBTypography tag="p" className="text-muted">
                  It looks like you haven't added any items to your cart yet.
                </MDBTypography>

                <div className="pt-5">
                  <MDBTypography tag="h6" className="mb-0">
                    <MDBBtn color="blue"  tag="a" href="/home" className="text-body">
                      <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to shop
                    </MDBBtn>
                  </MDBTypography>
                  
                </div>
              </div>
            </MDBContainer>
          )

          
            
            }
            </>  
    )}
     
  </section>
  );
  }