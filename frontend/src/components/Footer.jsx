import React from "react";
import styles from "./componentStyles/footer.module.css";
import {
    Security,
    Info,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Payment
} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import PaymentMethods from '../public/icons_payment1.jpg';
import styled from "styled-components";


const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 90%;
`;

const Footer = () => {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles['footer-col']}>
                            <h4>MED<span className={styles['hive']}>HIVE</span></h4>
                            <ul>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Our services</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Affiliate program</a></li>
                            </ul>
                        </div>
                        <div className={styles['footer-col']}>
                            <h4>Customer Services</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Shipping</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Order status</a></li>
                                <li><a href="#">Payment options</a></li>
                            </ul>
                        </div>
                        <div className={styles['footer-col']}>
                            <h4>online shop</h4>
                            <ul>
                                <li><a href="#">watch</a></li>
                                <li><a href="#">bag</a></li>
                                <li><a href="#">shoes</a></li>
                                <li><a href="#">dress</a></li>
                            </ul>
                        </div>
                        <div className={styles['footer-col']}>
                            <h4>follow us</h4>
                            <div className={styles['social-links']}>
                                <IconButton href="#">
                                    <Facebook />
                                </IconButton>
                                <IconButton href="#">
                                    <Twitter />
                                </IconButton>
                                <IconButton href="#">
                                    <Instagram />
                                </IconButton>
                                <IconButton href="#">
                                    <LinkedIn />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className={styles['footer-bottom']}>
                <div className={styles['footer-bottom-section1']}>
                    <p>&copy; 2023 MEDHIVE.Inc</p>
                </div>
                <div className={styles['footer-bottom-section']}>             
                            <ImgContainer>
                        <Image src={PaymentMethods} />
                    </ImgContainer>
                </div>
                <div className={styles['footer-bottom-section2']}>
                    <a href="#top">Scroll Up</a>
                </div>
            </div>
        </>
    )
}

export default Footer;
