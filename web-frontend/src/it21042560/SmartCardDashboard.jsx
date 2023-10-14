import { useState } from 'react';
import mobile from './images/mobile.png'
import tap from './images/tap.png'
import user from './images/user.png'
import {Link} from 'react-router-dom'

export default function SmartCardDashboard() {
    const [isHovered,setIsHovered] = useState(false);
    const [isHovered1,setIsHovered1] = useState(false);
    const [isHovered2,setIsHovered2] = useState(false);

    const divStyle = {
        backgroundColor: isHovered ? '#0069d9' : '#7eebf8',
        height: '150px',
        borderRadius: '30px',
      };

      const divStyle1 = {
        backgroundColor: isHovered1 ? '#0069d9' : '#1edcf3',
        height: '150px',
        borderRadius: '30px',
      };

      const divStyle2 = {
        backgroundColor: isHovered2 ? '#0069d9' : '#077a88',
        height: '150px',
        borderRadius: '30px',
      };

      const imgStyle = {
        width: '190px',
        float: 'right',
        marginRight: '60px',
        transition: 'transform 0.2s', // Add a smooth transition effect for zoom
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Zoom effect on hover
      };

      const imgStyle1 = {
        width: '190px',
        float: 'left',
        marginRight: '60px',
        transition: 'transform 0.2s', // Add a smooth transition effect for zoom
        transform: isHovered1 ? 'scale(1.1)' : 'scale(1)', // Zoom effect on hover,
        marginTop:'-10px'
      };

      const imgStyle2 = {
        width: '190px',
        float: 'right',
        marginRight: '60px',
        transition: 'transform 0.2s', // Add a smooth transition effect for zoom
        transform: isHovered2 ? 'scale(1.1)' : 'scale(1)', // Zoom effect on hover,
      };

  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#684bf6",
            height: "90px",
            borderRadius: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "30px",
              textAlign: "center",
              paddingTop: "10px",
              color: "white",
            }}
          >
            Smart Card Status
          </h4>
          <h4 style={{ textAlign: "center", marginTop: "-10px" }}>
            Not accepted
          </h4>
        </div>
        <div className="row" style={{padding:'30px'}}>
          <div className="col-8">
            <div className="row">
                <div style={divStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                    <img src={mobile} style={imgStyle}/>
                    <h3 style={{padding:'10px', color:'white'}}>01. Buy a Smart Card</h3>
                    <p style={{padding:'10px'}}>You can get smart card in few step. save your time and enjoy your ride. </p>
                </div>
            </div>
            <div className="row" style={{paddingTop:'10px'}}>
                <div style={divStyle1} onMouseEnter={() => setIsHovered1(true)} onMouseLeave={()=>setIsHovered1(false)}>
                    <img src={user} style={imgStyle1}/>
                    <h3 style={{paddingTop:'10px', color:'white'}}>01. Load and Ready</h3>
                    <p style={{padding:'10px'}}>Smart card in anyway anytime. Help you to save your pocket. </p>
                </div>
            </div>
            <div className="row" style={{paddingTop:'10px'}}>
                <div style={divStyle2} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={()=>setIsHovered2(false)}>
                    <img src={tap} style={imgStyle2}/>
                    <h3 style={{padding:'10px', color:'white'}}>01. Tap and Travel</h3>
                    <p style={{padding:'10px'}}>Just one tap, just one trip. no need to care your money pocket. </p>
                </div>
            </div>
          </div>
          <div className="col-4">
            <div style={{backgroundColor:'#a4c6fc',padding:'10px', height:'300px', borderRadius:'30px', marginRight:'15px', marginLeft:'15px'}}>
                <h4 style={{textAlign:'center'}}>Eligibility List To Obtain Smart Card</h4>
                <ul style={{paddingRight:'100px', paddingTop:'10px'}}>
                    <li>National Identity Card</li>
                    <li>Necessary Payment</li>
                    <li>Full Name</li>
                    <li>Date of Birth</li>
                    <li>Address</li>
                    <li>City</li>
                    <li>Postal Code</li>
                </ul>
            </div>
            <Link to={'/smartcard/request'}>
            <button className='btn btn-primary' style={{marginLeft:'150px', marginTop:'70px', fontSize:'24px', padding:'10px'}}>Request</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
