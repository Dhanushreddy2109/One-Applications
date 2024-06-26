import React from "react";
import "./home/home.scss";
import ContactUs from "./contactus/ContactUs";

const LandingPage = () => {
  return (
    <>
      <div class="main-banner" id="top">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="owl-carousel owl-banner">
                <div class="item item-3">
                  <div class="header-text">
                    <span class="category">Interview</span>
                    <h2>Track Your Interview Schedules Status</h2>
                    <p>
                      Here in this application you will track your interview
                      application like how many you applied and how many
                      companies you selected etc.
                    </p>
                    <div class="buttons">
                      <div class="main-button">
                        <a href="#">Let's Try</a>
                      </div>
                      <div class="icon-button">
                        <a href="#">
                          <i class="fa fa-play"></i>
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
