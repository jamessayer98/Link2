import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingIntro() {
  return (
    <div className="signin-left">
      <div className="signin-box">
        <h2 className="slim-logo">
          <Link to="/">
            iAutoData<span>.</span>
          </Link>
        </h2>

        <p>
          The only platform that helps you collect, analyze and measure the impact
          of all your data.
        </p>

        <p>Contact us for a free demo or create an account.</p>

        <p>
          <Link to="/" className="btn btn-outline-secondary pd-x-25">
            Learn More
          </Link>
        </p>

        <p className="tx-12">© Copyright 2018. All Rights Reserved.</p>
      </div>
    </div>
  );
}
