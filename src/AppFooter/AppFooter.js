import React, { Component } from 'react';
import logo from '../images/logo.png';
import './AppFooter.css';

class AppFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footerContainer">
        <div className="footerCopy">
            <div className="title">CrispCrafts &copy; 2018</div>
        </div>
      </div>
    );
  }
}

AppFooter.defaultProps = {
    company: 'CrispCrafts',
};

export default AppFooter;