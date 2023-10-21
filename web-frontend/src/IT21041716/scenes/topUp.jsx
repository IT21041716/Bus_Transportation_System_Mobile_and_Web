import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllByUser, Alltrips } from '../actions/topUpAction'
import Header from './header'
import './main.css'
import StripeCheckout from 'react-stripe-checkout'
import { NewTopUp } from '../actions/topUpAction'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Button } from "antd";
import { Link } from "react-router-dom";

const topUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const balance = useSelector((state) => state.topUp.balance);
    const trips = useSelector((state) => state.topUp.trips)
    const topUps = useSelector((state) => state.topUp.topUps);
    const user = useSelector((state) => state.auth.user);
    const [amount, setAmount] = useState('');

    const UID = user && user.UID;

    useEffect(() => {
        if (UID) {
            dispatch(getAllByUser({ UID }));
        }
    }, [dispatch, UID]);

    useEffect(() => {
        if (UID) {
            dispatch(Alltrips({ UID }));
        }
    }, [dispatch, UID]);

    const recentTopups = topUps.slice(Math.max(topUps.length - 8, 0));
    const recentTrips = trips.slice(Math.max(trips.length - 8, 0));

    const onToken = (token) => {
        fetch('http://localhost:5005/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk_test_51N4pjFFfj2A5CMYsrbLbeS69lbZ5H7t4PkzpaABdrGln8w3aGD11wrMVx537VINKhQgiXICUwgRXU4TrS55gtxp900llacGuwG`,
            },
            body: JSON.stringify({
                id: token.id,
                amount: amount,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data) {
                    const form = {
                        UID: UID,
                        smartCardID: user.smartCardID,
                        fullName: user.fullName,
                        contactNo: user.contactNo,
                        email: user.email,
                        amount: parseFloat(amount),
                    };
                    dispatch(NewTopUp(form));
                    setAmount('');
                }
            })
            .catch((error) => {
            });
    };

    useEffect(() => {
        if (user.smartCardID == 'Not Crated') {
            const timeout = setTimeout(() => {
                Swal.fire({
                    text: 'You are not eligible to access this service. Please request the smartcard before use this service..!',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // navigate('/');
                });
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [user, navigate]);

    return (
        <>
            <Header />
            <div className='mainContainer'>
                <div className='innerDivContainer'>
                    <h2 style={{ color: "white" }}>ACCOUNT BALANCE</h2>
                    <h3 style={{ color: "white" }}>Rs:{balance}.00</h3>
                </div>
                {/* <Link to={`/userJourney/${UID}`}>
                    <Button type="primary" style={{ marginBottom: 16 }}>
                        Add Reservation
                    </Button>
                </Link> */}
                <div className='innerDivContainer' id='innerDivMain'>
                    <div className='smallDiv'>
                        <h4>MOST RECENT TOPUP</h4>
                        <table className="table table-hover" style={{ marginLeft: '2rem', marginTop: '2rem' }}>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                            {
                                recentTopups.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(data.updatedAt).toLocaleDateString('en-GB')}</td>
                                        <td>{data.amount}.00</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    <div className='smallDiv'>
                        <h4>MOST RECENT TRIP FEE</h4>
                        <table class="table table-hover" style={{ marginLeft: '2rem', marginTop: '2rem' }}>
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Destination</th>
                                <th>Route</th>
                                <th>Amount</th>
                            </tr>
                            {
                                recentTrips.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(data.date).toLocaleDateString('en-GB')}</td>
                                        <td>{data.destination}</td>
                                        <td>{data.route}</td>
                                        <td>{data.amount}.00</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    <div className='smallDiv'>
                        <h4>RECHARGE ACCOUNT BALANCE</h4>
                        <span style={{ textAlign: 'justify', width: '300px', marginTop: '1rem' }}>Keep your travel hassle-free by ensuring a sufficient account balance for our CITYLINK public transportation services. Recharge your balance promptly to avoid any interruptions during your travels.</span>

                        <form style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <input
                                type="text"
                                placeholder="Enter recharge amount"
                                style={{ padding: '10px', margin: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />

                            <br />
                            {amount !== '' && (
                                <StripeCheckout
                                    token={onToken}
                                    stripeKey="pk_test_51N4pjFFfj2A5CMYsfVATViFh2bspBm3BWzF6oMNPfO1fYjdjBG3ZHnBxdqo20DQpAxbJdPsZOUmHDxsdChqvmQJ5005Q5nc9xY"
                                    name='Recharge Now'
                                >
                                    <button
                                        type="button"
                                        style={{ padding: '10px 20px', border: 'none', backgroundColor: '#000347', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Recharge
                                    </button>
                                </StripeCheckout>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default topUp;

