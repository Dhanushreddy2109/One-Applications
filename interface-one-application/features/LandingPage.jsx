import React from "react";
import "./home/home.scss";
import ContactUs from "./contactus/ContactUs";

const LandingPage = () => {
  return (
    <>
      <div className="main-banner" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="owl-carousel owl-banner">
                <div className="item item-3">
                  <div className="header-text">
                    <span className="category">Interview</span>
                    <h2>Track All Your Job Applications Effortlessly</h2>
                    <p>
                      Welcome to One Application! Here, you can manage and track
                      all your job applications in one place. Monitor the status
                      of your interviews, see how many applications you've
                      submitted, and keep track of which companies have selected
                      you.
                    </p>
                    <div className="buttons">
                      <div className="main-button">
                        <a href="#">Let's Try</a>
                      </div>
                      <div className="icon-button">
                        <a href="#">
                          <i className="fa fa-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
    </>
  );
};

export default LandingPage;
