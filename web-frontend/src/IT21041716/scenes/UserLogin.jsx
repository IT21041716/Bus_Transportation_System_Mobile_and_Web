import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/LOGO2.png'
import { Login } from '../actions/authAction'
import { toast } from 'react-hot-toast'
import { Navigate, Link } from 'react-router-dom'
import '../assets/css/styles.css'


const UserLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loading = useSelector((state) => state.auth.loading)
    const authenticated = useSelector((state) => state.auth.authenticated)


    useEffect(() => {
        if (loading === true) {
            toast.loading("Cheking...", {
                id: 'cheking'
            })
        }
        else if (loading === false) {
            toast.dismiss('cheking')
        }
    })

    const sendData = (e) => {
        e.preventDefault();


        if (email == '') {
            toast.error("Email required..!", {
                id: 'email'
            })
        } else if (password == '') {
            toast.error("Password required..!", {
                id: 'pwd'
            })
        } else if (password != '' && email != '') {

            const form = {
                email: email,
                password: password,
            }

            dispatch(Login(form));
            setEmail('');
            setPassword('');
        }
    }
    if (authenticated) {
        return <Navigate to='/topup' />
    };

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src={logo} width="180" alt="" />
                                        </Link>
                                        <form onSubmit={sendData}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <button type='submit' className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">New User?</p>
                                                <Link className="text-primary fw-bold ms-2" to="/register">Create an account</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin