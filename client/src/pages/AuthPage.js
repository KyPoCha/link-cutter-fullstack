import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = ()=>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(()=>{
        message(error);
        clearError();
    },[error, message,clearError]);

    useEffect(()=>{
        window.M.updateTextFields();
    },[]);

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async ()=>{
        try {
            const data = await request("https://link-cutter-kypocha-2-0.herokuapp.com/api/auth/register", "POST", {...form});
            message(data.message);
        }
        catch (e) {
        }
    }

    const loginHandler = async ()=>{
        try {
            const data = await request("https://link-cutter-kypocha-2-0.herokuapp.com/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
        }
        catch (e) {
        }
    }

    return(
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h1>Cut the link</h1>
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input className="form-style"
                                                               autoComplete="off"
                                                               placeholder="Enter the email"
                                                               id="email"
                                                               type="text"
                                                               name="email"
                                                               value={form.email}
                                                               onChange={changeHandler}/>
                                                            <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input className="form-style"
                                                               autoComplete="off"
                                                               placeholder="Enter the password"
                                                               id="password"
                                                               type="text"
                                                               name="password"
                                                               value={form.password}
                                                               onChange={changeHandler}/>
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button
                                                        className="btn yellow darken-4"
                                                        style={{marginRight: 10}}
                                                        onClick={loginHandler}
                                                        disabled={loading}
                                                    >
                                                        Enter
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="logname" className="form-style"
                                                               placeholder="Enter your name" id="logname"
                                                               autoComplete="off"/>
                                                            <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input className="form-style"
                                                               autoComplete="off"
                                                               placeholder="Enter the email"
                                                               id="email"
                                                               type="text"
                                                               name="email"
                                                               value={form.email}
                                                               onChange={changeHandler}/>
                                                            <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input className="form-style"
                                                               autoComplete="off"
                                                               placeholder="Enter the password"
                                                               id="password"
                                                               type="text"
                                                               name="password"
                                                               value={form.password}
                                                               onChange={changeHandler}/>
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button
                                                        className="btn gray lighten-1 black-text"
                                                        onClick={registerHandler}
                                                        disabled={loading}
                                                    >
                                                        Registration
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
};