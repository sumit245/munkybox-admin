import React, { Component } from "react";
import { Link } from 'react-router-dom'
import img15 from '../../assets/img/img15.png'
import img18 from '../../assets/img/img18.png'

export default class LoginScreen extends Component {
  state = { username: "", password: "" }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLogin = () => {
    const { username, password } = this.state

    if (username === 'admin@gmail.com' && password === '12345') {
      sessionStorage.setItem('adminName', 'admin123')
      sessionStorage.setItem('adminRole', 'admin')
      window.location.href = '/'
    }
    else if (username === 'accounts@gmail.com' && password === '12345') {
      sessionStorage.setItem('adminName', 'accounts')
      sessionStorage.setItem('adminRole', 'accountant')
      window.location.href = '/'
    }
    else {
      alert('invalid username or password')

    }

  }
  render() {
    const { username, password } = this.state
    return (
      <div style={{ height: 510, }}>
        <header className="navbar navbar-header navbar-header-fixed">
          <div className="navbar-brand">
            <Link className="df-logo">Munky<span>box</span></Link>
          </div>{/* navbar-brand */}
        </header>{/* navbar */}
        <div className="content content-fixed content-auth">
          <div className="container">
            <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
              <div className="media-body align-items-center d-none d-lg-flex">
                <div className="mx-wd-600">
                  <img src={img15} className="img-fluid" alt="" />
                </div>
              </div>{/* media-body */}
              <div className="sign-wrapper mg-lg-l-50 mg-xl-l-60">
                <div className="wd-100p">
                  <h3 className="tx-color-01 mg-b-5">Sign In</h3>
                  <p className="tx-color-03 tx-16 mg-b-40">
                    Welcome back! Please signin to continue.
                  </p>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="yourname@yourmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <div className="d-flex justify-content-between mg-b-5">
                      <label className="mg-b-0-f">Password</label>

                    </div>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Link to="/forgotpage" className="tx-13">
                    Forgot password?
                      </Link>
                  <button className="btn btn-brand-02 btn-block" onClick={this.handleLogin} >
                    Sign In
                  </button>
                </div>
              </div>
              {/* sign-wrapper */}
            </div>
            {/* media */}
          </div>
          {/* container */}
        </div>
        {/* content */}
        <footer className="footer">

          <div>
            <span>© Srpgroup </span>
            <span>Created by <Link to="#">Srpgroup</Link></span>
          </div>
          <div>
            <nav className="nav">
              <Link to="#" className="nav-link">Licenses</Link>
              <Link to="#" className="nav-link">Change Log</Link>
              <Link to="#" className="nav-link">Get Help</Link>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export class ForgotPage extends Component {
  render() {
    return (
      <div style={{ height: 510, }}>
        <header className="navbar navbar-header navbar-header-fixed">
          <div className="navbar-brand">
            <Link to="../../index.html" className="df-logo">Munky<span>box</span></Link>
          </div>{/* navbar-brand */}
        </header>{/* navbar */}
        <div className="content content-fixed content-auth-alt">
          <div className="container d-flex justify-content-center ht-100p">
            <div className="mx-wd-300 wd-sm-450  d-flex flex-column align-items-center justify-content-center">
              <div className="wd-80p wd-sm-300 mg-b-15">
                <img
                  src={img18}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <h4 className="tx-20 tx-sm-24">Reset your password</h4>
              <p className="tx-color-03 mg-b-30 tx-center">
                Enter your username or email address and we will send you a link
                to reset your password.
            </p>
              <div className="wd-100p d-flex flex-column flex-sm-row mg-b-40">
                <input
                  type="text"
                  className="form-control wd-sm-250 flex-fill"
                  placeholder="Enter username or email address"
                />
                <button className="btn btn-brand-02 mg-sm-l-10 mg-t-10 mg-sm-t-0">
                  Reset Password
              </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">

          <div>
            <span>© Srpgroup </span>
            <span>Created by <Link to="#">Srpgroup</Link></span>
          </div>
          <div>
            <nav className="nav">
              <Link to="#" className="nav-link">Licenses</Link>
              <Link to="#" className="nav-link">Change Log</Link>
              <Link to="#" className="nav-link">Get Help</Link>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}
