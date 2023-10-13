import topup from "../models/topup.js";
import smartCard from "../models/smartCard.js";

export const newTopup = async (req, res) => {
    try {
        const id = { uId: req.body.UID };
        const prefix = "PID"
        const PID = (prefix + "_" + Date.now())

        const data = new topup({
            PID: PID,
            UID: req.body.UID,
            smartCardID: req.body.smartCardID,
            fullName: req.body.fullName,
            contactNo: req.body.contactNo,
            email: req.body.email,
            amount: parseFloat(req.body.amount),
        })

        const response = await data.save();
        if (response) {
            const checkCard = await smartCard.findOne({ uId: req.body.UID });
            const availableBalance = checkCard.balance;
            const newBalanace = availableBalance + req.body.amount;

            const data = {
                balance: newBalanace
            }
            const update = await smartCard.findOneAndUpdate(id, data, { new: true });
            if (update) {
                res.status(201).json({
                    message: 'Smartcard topup successfull...!',
                    payload: {
                        UID: update.UID,
                        fullName: update.fullName,
                        email: req.body.email,
                        nic: update.nic,
                        dob: update.dob,
                        address: update.address,
                        contactNo: update.contactNo,
                        smartCardID: update.smartCardID,
                        balance: update.balance
                    }
                })

            } else {
                res.status(404).json({
                    message: "Topup failed..!"
                })
            }
        } else {
            res.status(403).json({
                message: "Topup failed..!"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}

export const topUpByUser = async (req, res) => {
    try {
        const fetchData = await topup.find({ UID: req.body.UID })
        if (fetchData) {
            res.status(200).json({
                message: 'Fetch Success..!',
                payload: fetchData
            })
        } else {
            res.status(404).json({
                message: 'Fetch error..!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}

export const checkBalance = async (req, res) => {
    try {
    const check = await smartCard.findOne({ uId: req.body.UID })
    const balance = check.balance
    if (check) {
        if (balance < 100) {
            res.status(200).json({
                message: "Account balance getting low..!",
                payload: balance
            })
        } else {
            res.status(400).json({
                message: "Account balance Ok..!",
                payload: balance
            })
        }
    } else {
        res.staus(404).json({
            message: 'No smart card found under this UID'
        })
    }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}

export const deductBalance = async (req, res) => {
    try {
        const checkCard = await smartCard.findOne({ uId: req.body.UID });
        if (checkCard) {
            const availableBalance = checkCard.balance;
            const newBalanace = availableBalance - req.body.amount;

            const data = {
                balance: newBalanace
            }
            const id = { uId: req.body.UID };
            const update = await smartCard.findOneAndUpdate(id, data, { new: true });
            if (update) {
                res.status(201).json({
                    message: 'Smartcard deduct successfull...!',
                    payload: {
                        UID: update.UID,
                        fullName: update.fullName,
                        email: req.body.email,
                        nic: update.nic,
                        dob: update.dob,
                        address: update.address,
                        contactNo: update.contactNo,
                        smartCardID: update.smartCardID,
                        balance: update.balance
                    }
                })

            } else {
                res.status(404).json({
                    message: "Deduct failed..!"
                })
            }
        } else {
            res.staus(403).json({
                message: 'No smart card found under this UID'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}