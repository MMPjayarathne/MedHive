import React from 'react'
import bannerPic from '../public/pexels-ylanite-koppens-612825.jpg'
import './componentStyles/Banner.css'

const Banner = (props) => {
  return (
    <>
      <div className="group17-container">
        <div className="group17-group17">
          <img
            src={bannerPic}
            alt="pexelsylanitekoppens61282511634"
            className="group17-pexelsylanitekoppens6128251"
          />
          <div className="group17-group5">
            <button className="group17-button">
              <span className="group17-text Button-Larg">See Collection</span>
            </button>
            <span className="group17-text01">
              <span>
                Click the button to have
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <br></br>
              <span>various offers and gifts</span>
            </span>
            <span className="group17-text05">
              <span>Special Deals</span>
            </span>
            <span className="group17-text07">
              <span>MED</span>
              <span className="group17-text09">HIVE</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
