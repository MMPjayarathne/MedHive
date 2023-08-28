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
  import {  Grid, Button,TextField } from '@mui/material';
  import { MDBIcon} from 'mdbreact';
import { ThreeDots } from 'react-loader-spinner';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import SignIn from './SignIn';
import './pageStyles/ShoppingCart.css';
import Swal from 'sweetalert2';
import { position } from '@chakra-ui/react';
import { usePrescriptionContext } from './helpers/PrescriptionContext';

const ShoppingCart = () => {
  const location = useLocation();
  const [Items, setItems] = useState([]);
  const [token] = useState(Cookies.get('token') || '');
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const URLproductId = localStorage.getItem('cartProductId');
  const URLquantity = localStorage.getItem('cartProductQuantity');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const { setPrescriptionFile } = usePrescriptionContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(response.data);
        console.log("cart",response.data);
        setProducts(response.data.productList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [URLproductId, URLquantity, navigate, token]);

  const showAlertToDeleteCartItem = async (cartItemId) => {
    const loadingSwal = Swal.fire({
      title: 'Delete Confirmation',
      text: 'Do you want to remove this item from the cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true, // Show loading indicator in the confirm button
    });
  
    try {
      const result = await loadingSwal;
      if (result.isConfirmed) {
        await deleteClick(cartItemId);
        await Swal.fire('Deleted', 'Item has been removed from the cart.', 'success');
        window.location.href = `/cart`;
      }
    } catch (error) {
      // Handle any errors that might occur during the loading and deleting process
      console.error(error);
      Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
    }
  };
  
  const deleteClick = async(cartItemId) => {
    try {
      console.log(cartItemId);
      const response = await axios.post(
        'http://localhost:8080/api/v1/cart/deleteCartItem',
        {
          cartItemId: cartItemId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("done")

      if (response.status === 200) {
        navigate('/cart');
      } else {
        console.log('There is an error in deleting the item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const showAlertToDeleteCart = async () => {
    const loadingSwal = Swal.fire({
      title: 'Delete Confirmation',
      text: 'Do you Delete the whole cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true, // Show loading indicator in the confirm button
    });
  
    try {
      const result = await loadingSwal;
      if (result.isConfirmed) {
        await deleteClickForCart();
        await Swal.fire('Deleted', 'Cart has been removed.', 'success');
        window.location.href = `/cart`;
      }
    } catch (error) {
      // Handle any errors that might occur during the loading and deleting process
      console.error(error);
      Swal.fire('Error', 'An error occurred while deleting the item.', 'error');
    }
  };

  const deleteClickForCart = async() => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/cart/deleteCart',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("done")

      if (response.status === 200) {
        navigate('/cart');
      } else {
        console.log('There is an error in deleting the Cart');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  //----------functions for prescription------------

  const handleShowPrescriptionForm = () => {
    setShowPrescriptionForm(true);
  };


  const handleBuy = () => {
    Cookies.set("orders", JSON.stringify(Items), {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // Expires after 7 days
    });
    localStorage.setItem("isCart",true);
    // You can add your logic here to handle the buy action with prescription
    // For example, you can send the prescriptionFile to the server
    navigate("/order")
  };
  const [selectedFileName, setSelectedFileName] = useState('');

  const handlePrescriptionFileChange = (event) => {
    const file = event.target.files[0];
    setPrescriptionFile(file);
    setPrescription(file);
    setSelectedFileName(file ? file.name : '');
  };


 

  if (!token) {
    return <SignIn />;
  }

  const productListLength = Items.productList ? Items.productList.length : 0;


  return (
  <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
   {loading ? (
               <div style={{ display: 'flex', justifyContent: 'center',height:'auto', alignItems: 'center',marginTop:'30%' }}>
               <ThreeDots color="#00BFFF" height={100} width={100} />
             </div>
            ) : (
              <>  
          {Items.productList && productListLength != 0 ? (
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
                              <>
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
                                    <a onClick={() => showAlertToDeleteCartItem(product.cartItemId)}  className="text-muted">
                                      <MDBIcon fas icon="times" />
                                    </a>
                                  </MDBCol>
                                </MDBRow>

                        
              
                                <hr className="my-4" />
                                </>
                                ))}
                                </>
          
                          
          
                          
          
        
                            <div className="pt-5">
                              <MDBTypography tag="h6" className="mb-0">
                                <MDBCardText tag="a" href="/home" className="text-body">
                                  <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                  to shop
                                </MDBCardText>
                                <button type="button" class="btn btn-danger" style={{ float: 'right' }} onClick={() => showAlertToDeleteCart()} >Delete</button>

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
                            {
                              Items.needPrescription?(
                                  <MDBBtn color="dark" block size="lg" onClick={handleShowPrescriptionForm}>
                                  Enter the prescription
                                </MDBBtn>
                                

                              ):(
                                    <MDBBtn color="dark" block size="lg"  onClick={handleBuy}>
                                  Buy
                                </MDBBtn>
                              )

                            }
                            <br/>
                             {/* Prescription form */}
                            {showPrescriptionForm && (
                              <Grid item xs={12}>
                                <input
                                  type="file"
                                  accept="image/*,.pdf,.doc,.docx"
                                  onChange={handlePrescriptionFileChange}
                                />
                               
                                <br/><br/>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled={!prescription}
                                  onClick={handleBuy}
                                >
                                  Buy
                                </Button>
                              </Grid>
                            )}
                            
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
  };

  export default ShoppingCart;