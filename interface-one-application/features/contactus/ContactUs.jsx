import React from "react";
import "../home/home.scss";

const ContactUs = () => {
  return (
    <div class="contact-us section" id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-6  align-self-center">
            <div class="section-heading">
              <h6>Hassle Free</h6>
              <h2>Collaborate with Your Job Consultants</h2>
              <p>
                Grant access to your job consultants or agencies to help you
                manage and track your job applications seamlessly. With shared
                access, your consultants can update your application statuses,
                provide valuable insights, and assist you in landing your dream
                job faster.
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="contact-us-content-wrapper">
              <form id="contact-form" action="" method="post"></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
