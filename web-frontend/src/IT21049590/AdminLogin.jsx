import { useState } from "react";
import {
  faSignInAlt,
  faUser,
  faUnlockAlt,
  faBriefcase,
  faBicycle,
  faCar,
  faCarSide,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userName, setUserName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (isLogin) => {
    setIsLoginForm(isLogin);
  };

  const userSignUp = (e) => {
    console.log("Hi");
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userName === "") {
      toast.error("Please Enter User Name..", {
        id: "name",
      });
    } else if (email === "") {
      toast.error("Please Provide Your Email..", {
        id: "email",
      });
    } else if (password === "") {
      toast.error("Please Provide a Password..", {
        id: "pwd",
      });
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters long", {
        id: "pwdLength",
      });
    } else if (contactNo === "") {
      toast.error("Please Provide a Telphone Number..", {
        id: "tel",
      });
    } else if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      contactNo !== ""
    ) {
      const form = new FormData();

      form.append("userName", userName);
      form.append("email", email);
      form.append("password", password);
      form.append("contactNo", contactNo);
      axios
        .post("http://localhost:8070/Admin/adminSignup", form)
        .then(() => {
          toast.success("Successfully Registred");
          navigate("/userLogin");
        })
        .catch(() => {
          toast.success("Something Went Wrong");
        });

      setEmail("");
      setPassword("");
      setUserName("");
      setContactNo("");
    }
  };
  const userLogin = (e) => {
    e.preventDefault();
    console.log("Hi");
    if (email === "") {
      toast.error("Please Provide An Email..!", {
        id: "email",
      });
    } else if (password === "") {
      toast.error("Please Provide the Password..!", {
        id: "'password'",
      });
    } else if (email === "" && password === "") {
      toast.error("PPlease provide the Credentials...!", {
        id: "credential",
      });
    } else if ((email !== "") & (password !== "")) {
      const user = {
        email,
        password,
      };

      const uid = axios
        .post("http://localhost:5005/admin/adminSignin", user)
        .then((response) => {
          toast.success("Successfull Login!");
          const uid = response.data.payload.uid;
          console.log(uid);
          toast.success("Login Success!");
          navigate("/userProfile");
        })
        .catch(() => {
          alert("Not ok");
          toast.error("Something Went Wrong!");
        });

      setEmail("");
      setPassword("");
    }
  };

  const buttonVariants = {
    visible: {
      x: [0, -20, 20, -20, 20, 0],
      transition: { delay: 2 },
    },
    hover: {
      scale: 1.1,
      // scale:[1,1.1,1,1.1,1,1.1,1,1.1,1,1.5],
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };
  const loaderVariants = {
    animationOne: {
      x: [-150, 150],
      // y: [0, -50],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 15,
          repeat: Infinity,
        },
        // y: {
        //   yoyo: Infinity,
        //   duration: 9,
        //   repeat: Infinity,
        // }
      },
    },
  };

  return (
    <section className="vh-100">
      {" "}
      <br />
      <br />
      <div className="row">
        <div>
          <center>
            <motion.div
              style={{
                border: "2px solid #8B4513",
                backgroundColor: "#f0f3ff",
                borderRadius: "20px",
                padding: "10px",
                width: "40%",
              }}
              transition={{
                delay: 0.2,
                duration: 2.0,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{
                boxShadow: "0px 0px 8px rgb(255,255,255)",
                scale: 1.03,
              }}
            >
              <h3>Login </h3> <hr />
              <div style={{ width: "80%" }}>
                {isLoginForm ? (
                  <div
                    className="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                    style={{ width: "80%" }}
                  >
                    <form onSubmit={userLogin}>
                      {" "}
                      <br />
                      <div className="form-outline mb-4">
                        <br />
                        <input
                          type="email"
                          id="loginName"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="loginName">
                          Email
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="loginPassword"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="loginPassword">
                          Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-block mb-4"
                        style={{
                          background:
                            "linear-gradient(90deg, #8B0000, #CD5C5C, #B22222,#CD5C5C, #8B0000)",
                          borderRadius: "20px",
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                          transition: "all 0.3s ease",
                        }}
                        whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255,255,255)",
                          boxShadow: "0px 0px 8px rgb(255,255,255)",
                        }}
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <p style={{ color: "grey" }}>
                          Not a member?{" "}
                          <a
                            href="#pills-register"
                            style={{
                              color: "#6a11cb",
                              textDecoration: "underline",
                            }}
                          >
                            Register
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div
                    className="tab-pane fade show active"
                    id="pills-register"
                    role="tabpanel"
                    aria-labelledby="tab-register"
                  >
                    <form onSubmit={userSignUp}>
                      <br />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="registerName"
                              className="form-control"
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="ex: Ceylon Tours"
                            />
                            <label
                              className="form-label"
                              htmlFor="registerName"
                            >
                              Name
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="registerEmail"
                              className="form-control"
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="ex: CeylonTours@gmail.com"
                            />
                            <label
                              className="form-label"
                              htmlFor="registerEmail"
                            >
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="registerPassword"
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="ex: CeylonX11"
                            />
                            <label
                              className="form-label"
                              htmlFor="registerPassword"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="registerCountry"
                              className="form-control"
                              onChange={(e) => setContactNo(e.target.value)}
                              placeholder="ex: +255 589 4225"
                            />
                            <label
                              className="form-label"
                              htmlFor="registerCountry"
                            >
                              Contact No
                            </label>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        className="btn btn-block mb-3"
                        style={{
                          background:
                            "linear-gradient(90deg, #8B0000, #CD5C5C, #B22222,#CD5C5C, #8B0000)",
                          borderRadius: "20px",
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
                          transition: "all 0.3s ease",
                          marginLeft: "10px",
                        }}
                      >
                        Sign Up
                      </motion.button>
                    </form>
                  </div>
                )}

                <div class="tab-content">
                  <div
                    class="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  ></div>
                  <div
                    class="tab-pane fade"
                    id="pills-register"
                    role="tabpanel"
                    aria-labelledby="tab-register"
                  ></div>
                </div>
              </div>
            </motion.div>
          </center>
        </div>
      </div>{" "}
      <br /> <br />
    </section>
  );
}
export default AdminLogin;
