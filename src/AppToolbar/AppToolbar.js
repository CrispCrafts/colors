import React, { Component } from 'react';
import logo from '../images/logo.png';
import './AppToolbar.css';

class AppToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="toolbarContainer">
        <div className="toolbarLogo">
            <img src={logo} alt="logo"/>
            <div className="title">{this.props.title}</div>
        </div>
      </div>
    );
  }
}

AppToolbar.defaultProps = {
    title: ''
};

export default AppToolbar;
