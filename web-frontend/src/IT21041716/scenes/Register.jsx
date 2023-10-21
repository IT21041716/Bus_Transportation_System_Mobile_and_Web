import React, { useState, useEffect } from 'react'
import logo from '../assets/LOGO2.png'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/authAction'
import { toast } from 'react-hot-toast'
import '../assets/css/styles.css'

const UserRegister = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    useEffect(() => {
        if (loading === true) {
            toast.loading("Loading...", {
                id: 'loading'
            })
        }
        else if (loading === false) {
            toast.dismiss('loading')
        }
    })


    const sendData = (e) => {
        e.preventDefault();

        if (name == '') {
            toast.success("Name is required..!")
        } else if (nic == '') {
            toast.error("NIC is required..!")
        } else if (dob == '') {
            toast.error("DOB is required..!")
        } else if (address == '') {
            toast.error("Address is required..!")
        } else if (contactNo == '') {
            toast.error("Contact Number is required..!")
        } else if (email == '') {
            toast.error("Email is required..!")
        } else if (password == '') {
            toast.error("Password is required..!")
        } else if (confirmPwd == '') {
            toast.error("Confirm Password is required..!")
        } else if (name != '', nic != '' && dob != '' && address != '' && email != '' && contactNo != '' && password != '' && confirmPwd != '') {
            if (password === confirmPwd) {
                const form = {
                    fullName: name,
                    nic: nic,
                    dob: dob,
                    address: address,
                    contactNo: contactNo,
                    email: email,
                    password: password,

                }
                dispatch(Register(form))
                setName('')
                setNic('')
                setDob('')
                setAddress('')
                setEmail('')
                setContactNo('')
                setPassword('')
                setConfirmPwd('')

            } else {
                toast.error("Password doesnot matching..!")
            }
        }
    }
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3" style={{ width: '35%', marginTop: '1rem', marginBottom: '1rem' }}>
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src={logo} width="180" alt="" />
                                        </a>
                                        <form>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">Full Name</label>
                                                <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="textHelp" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">NIC</label>
                                                <input type="text" className="form-control" id="exampleInputtext2" aria-describedby="textHelp" value={nic} onChange={(e) => setNic(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">DOB</label>
                                                <input type="date" className="form-control" id="exampleInputtext3" aria-describedby="textHelp" value={dob} onChange={(e) => setDob(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">Contact No</label>
                                                <input type="text" className="form-control" id="exampleInputtext4" aria-describedby="emailHelp" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputtext1" className="form-label">Address</label>
                                                <input type="text" className="form-control" id="exampleInputtext5" aria-describedby="emailHelp" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputContact" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="exampleInputContact" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div className="mb-4">
                                                <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword2" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                                            </div>
                                            <button onClick={sendData} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                                <a className="text-primary fw-bold ms-2" href="/">Sign In</a>
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

export default UserRegister