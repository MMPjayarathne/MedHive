import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import Cookies from 'js-cookie';

const CustomContainer = styled(Container)({
    padding: '30px',
    backgroundColor: '#003256',
    alignItems:'center',
    
  });

const orderSuccessful = () => {
    const order = JSON.parse(localStorage.getItem("orderResponse"));
   // console.log(order);




    const handlePrint = () => {
        const printContent = document.getElementById("print-content");
        const printWindow = window.open('', '', 'width=900,height=auto'); // Adjust height to auto
        printWindow.document.write('<html><head><title>Order Confirmation</title>');
        
        // Link to the print stylesheet
        printWindow.document.write('<link rel="stylesheet" type="text/css" href="/src/pages/pageStyles/Print.css">');
        
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };



    return(
        <>
    <div id="print-content">
        <CustomContainer maxWidth="lg">
        <Paper sx={{ p: 3 }} elevation={3} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",backgroundImage: "url('https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",}}>
        
        <h1 style={{fontSize:"100px" , fontWeight:"bolder"}}  >MED<span style={{color: "#FFB800"}}>HIVE</span></h1>
            <Typography variant="h3" className="fw-bold mb-2 text-black" style={{ textAlign: "center" }}>
            Order Successful!
            </Typography>
            <Typography variant="text" className="mb-4 text-black" style={{ textAlign: "center" }}>
            Your order has been successfully placed and is now being processed. We appreciate your trust in our services.
            <br/>
                We will notify through a email you when the order is sent.
            </Typography>
            <Typography variant="text" className="mb-4 text-black" style={{ textAlign: "center" }}>
                Name: {order.Name}<br/>
                Order Id: {order._id} <br/>
                Date: {order.OrderedDate}
            </Typography>
            <Typography variant="h6" className="text-black" style={{ textAlign: "center" }}>
            Thank you for choosing MED<span style={{color: "#FFB800"}}>HIVE</span> for your healthcare needs. Our team is dedicated to providing you with the best service and products.
            </Typography>
            <Typography variant="body2" className="mt-3 text-black" style={{ textAlign: "center" }}>
            If you have any questions or need further assistance, please feel free to contact our customer support through our <a href='/contact'> Contact Page</a>.
            </Typography>

       
        <Typography variant="h6" className="text-black" style={{ textAlign: "center", paddingTop:"40px" }}>
            Thank you! <br/>MED<span style={{color: "#FFB800"}}>HIVE</span>Team.
            </Typography>

        </Paper>
        </CustomContainer>
    </div>
       <br/><br/>

        <Button variant="contained" color="primary" style={{ position: "relative", left: "20px", bottom: "20px" }}>
                Home
            </Button>
            <Button variant="contained" color="primary" style={{ position: "relative", right: "20px", bottom: "20px", float:"right" }} onClick={handlePrint}>
                Save
            </Button>
</>





    );

};

export default orderSuccessful;