import React, { Component } from "react";
import {Link} from "react-router-dom";

import logo from './../../images/grubhub-logo.jpg';
import FooterPage from '../StartingPage/FooterPage';
import AboutGrubhubPage from '../StartingPage/AboutGrubhubPage';
import SnippetsPage from '../StartingPage/SnippetsPage';
import DeliveryInfoPage from '../StartingPage/DeliveryInfoPage';

class Landingpage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md front_logo">
            <img className="img-responsive" src={logo} alt="Grubhub"></img>
          </div>
          <div className="col-md text-center landing_button">
            <Link to="/login-user">
              <button className="btn btn-outline-primary btn-lg m-5">User Login</button>
            </Link>
            <Link to="/login-vendor">
              <button className="btn btn-outline-primary btn-lg">Vendor Login</button>
            </Link>
          </div>
        </div>
        <br/><br/><br/><br/><br/>
        <div className="Snippets">
          <SnippetsPage />
        <br/><br/><br/><br/>
        </div>
        <div className="DeliveryInfo">
          <DeliveryInfoPage />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
        <div className="AboutGrubhub">
          <AboutGrubhubPage />
          <br/><br/><br/><br/><br/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        <div className="Footer">
          <FooterPage />
        </div>
      </div>
    );
  }
}
export default Landingpage;
