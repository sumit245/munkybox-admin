import React, { useState } from 'react'
import Logo from "../../img/logo.png"
import axios from 'axios'
export default function Login({ setLoggedin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        const data = {
            email: email,
            password: password
        }
        const response = await axios.post("/api/admin-login/login", data)
        const { status } = response
        if (status === 200) {
            setLoggedin(true)
            localStorage.setItem(
                "logged_in_token",
                JSON.stringify({
                    logged_in: true
                })
            )
        } else {
            alert("Wrong username or password")
        }
    }
    return (
        <div>
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src={Logo} style={{ width: '185px' }} alt="logo" />
                                            </div>
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Username</label>
                                                    <input
                                                        type="email"
                                                        id="form2Example11"
                                                        className="form-control"
                                                        style={{ accentColor: "#ff6600" }}
                                                        placeholder="Email address"
                                                        name="email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example22">Password</label>
                                                    <input
                                                        type="password"
                                                        id="form2Example22"
                                                        className="form-control"
                                                        placeholder='123456789'
                                                        name='password'
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-center pt-1 pb-1">
                                                    <button
                                                        className="btn btn-primary btn-block gradient-custom-2"
                                                        type="button"
                                                        onClick={login}
                                                    >Log in</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">Feasti Dash Inc.</h4>
                                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}