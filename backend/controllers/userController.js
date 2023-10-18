import user from "../models/user.js";
import smartCard from "../models/smartCard.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let refreshTokens = [];

export const Register = async (req, res) => {
    try {
        const existUser = await user.findOne({ email: req.body.email })
        if (existUser) {
            res.status(401).json({
                message: "Email already registered..!",
            })
        } else {
            const prefix = "UID"
            const UID = (prefix + "_" + Date.now())
            const HashPass = await bcrypt.hash(req.body.password, 10);

            const newUser = new user({
                UID: UID,
                fullName: req.body.fullName,
                email: req.body.email,
                nic: req.body.nic,
                dob: req.body.dob,
                address: req.body.address,
                contactNo: req.body.contactNo,
                password: HashPass,
                smartCardID: "Not Crated"
            });

            const response = await newUser.save();
            if (response) {
                res.status(200).json({
                    message: "Registration successfull..!",
                    payload: response,
                })
            } else {
                res.status(404).json({
                    message: "Registration error..!"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong..!",
            error: error
        })
    }
}

export const Login = async (req, res) => {
    console.log(req.body)
    try {
        const checkUser = await user.findOne({ email: req.body.email });
        if (checkUser) {
            const dbPwd = checkUser.password;
            const enteredPwd = req.body.password;

            const checkPwd = await bcrypt.compare(enteredPwd, dbPwd);
            if (checkPwd) {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' })
                const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '12h' })
                refreshTokens.push(refreshToken);

                res.status(200).json({
                    message: 'Login Successfull..!',
                    token,
                    refreshToken,
                    user: {
                        UID: checkUser.UID,
                        fullName: checkUser.fullName,
                        email: checkUser.email,
                        nic: checkUser.nic,
                        dob: checkUser.dob,
                        address: checkUser.address,
                        contactNo: checkUser.contactNo,
                        smartCardID: checkUser.smartCardID
                    }
                })
            } else {
                res.status(404).json({
                    message: 'Password incorrect..!'
                })
            }
        } else {
            res.status(405).json({
                message: 'No user under this email..!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong..!",
            error: error,
        })
    }
}

export const tokenRefresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        res.status(401).json({
            message: "Unauthorized..!"
        })
    } else if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json({
            message: "Forbidden..!"
        })
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
            if (err) {
                res.status(404).json({
                    message: "error..!"
                })
            } else {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "12h" });
                res.status(201).json({
                    message: "Session Extended..!",
                    token
                })
            }
        })
    }
}

export const updateUserSmartCard = async (req, res) => {
    try {
        const id = { UID: req.body.UID };
        const checkCardRequest = await smartCard.findOne({ uId: req.body.UID });
        if (checkCardRequest) {
            if (checkCardRequest.status === "Accepted") {
                const newData = {
                    smartCardID: req.body.SID,
                };
                const update = await user.findOneAndUpdate(id, newData, { new: true });
                if (update) {
                    res.status(200).json({
                        message: "SmartCard added to user...!",
                        user: {
                            UID: update.UID,
                            fullName: update.fullName,
                            email: update.email,
                            nic: update.nic,
                            dob: update.dob,
                            address: update.address,
                            contactNo: update.contactNo,
                            smartCardID: update.smartCardID
                        }
                    });
                } else {
                    res.status(400).json({
                        message: "Update failed..!"
                    });
                }

            } else if ("Denied") {
                res.status(401).json({
                    message: "Smartcard Request denied from admin..!"
                });
            }
        } else {
            res.status(405).json({
                message: "Smartcard request not found..!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!",
            error: error.message
        });
    }
};

