import topup from "../models/topup.js";
import smartCard from "../models/smartCard.js";
import trip from "../models/trip.js";
import twilio from 'twilio'
import { parsePhoneNumberFromString } from 'libphonenumber-js';


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
                try {

                    //MESSAGE 
                    const phoneNumber = parsePhoneNumberFromString(update.contactNo, 'LK');
                    const Twilio = new twilio(process.env.SID, process.env.TWILIO_KEY)
                    const formattedNumber = phoneNumber.format("E.164");
                    const msg = await Twilio.messages.create({
                        from: "+15408541304",
                        to: formattedNumber,
                        body: `Sent from your CITYLINK \n UID: ${req.body.UID}\n Smart Card ID: ${update.smartCardID}\n Name: ${update.fullName}\n Amount: ${req.body.amount}\n Balance: ${newBalanace}\n\n Account balance increased. Thank you for choosing CITYLINK. For any queries or assistance, feel free to reach out to us. Stay connected with us!`
                    });
                    console.log("message sent");
                } catch (error) {
                    console.error("Error sending message:", error);
                }



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
                message: "Not found..!"
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
                res.status(201).json({
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

                //message sent
                //MESSAGE 
                const phoneNumber = parsePhoneNumberFromString(update.contactNo, 'LK');
                const Twilio = new twilio(process.env.SID, process.env.TWILIO_KEY)
                try {
                    const formattedNumber = phoneNumber.format("E.164");
                    const msg = await Twilio.messages.create({
                        from: "+15408541304",
                        to: formattedNumber,
                        body: `Sent from your CITYLINK \n UID: ${req.body.UID}\n Smart Card ID: ${update.smartCardID}\n Name: ${update.fullName}\n Amount: ${req.body.amount}\n Route: ${req.body.route}\n Destination: ${req.body.destination}\n Balance: ${newBalanace}\n\n Ticket pruchase details. Thank you for choosing CITYLINK. For any queries or assistance, feel free to reach out to us. Stay connected with us!`
                    });
                    console.log("message sent");
                } catch (error) {
                    console.error("Error sending message:", error);
                }
                //trip saved
                const newTrip = new trip({
                    UID: req.body.UID,
                    destination: req.body.destination,
                    route: req.body.route,
                    date: req.body.date,
                    amount: parseFloat(req.body.amount),
                })
                const response = await newTrip.save();
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

export const claimUpdateBalance = async (req, res) => {
    try {
        const checkCard = await smartCard.findOne({ uId: req.body.UID });
        if (checkCard) {
            const availableBalance = checkCard.balance;
            const newBalanace = availableBalance + req.body.amount;


            const data = {
                balance: newBalanace
            }
            const id = { uId: req.body.UID };
            const update = await smartCard.findOneAndUpdate(id, data, { new: true });
            if (update) {

                //MESSAGE 
                const phoneNumber = parsePhoneNumberFromString(update.contactNo, 'LK');
                const Twilio = new twilio(process.env.SID, process.env.TWILIO_KEY)
                try {
                    const formattedNumber = phoneNumber.format("E.164");
                    const msg = await Twilio.messages.create({
                        from: "+15408541304",
                        to: formattedNumber,
                        body: `Sent from your CITYLINK \n UID: ${req.body.UID}\n Smart Card ID: ${update.smartCardID}\n Name: ${update.fullName}\n Amount: ${req.body.amount}\n Balance: ${newBalanace}\n\n Refund successfull. Thank you for choosing CITYLINK. For any queries or assistance, feel free to reach out to us. Stay connected with us!`
                    });
                    console.log("message sent");
                } catch (error) {
                    console.error("Error sending message:", error);
                }


                res.status(201).json({
                    message: 'Smartcard refund successfull...!',
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
                    message: " failed..!"
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

export const getTrips = async (req, res) => {
    try {
        const fetchData = await trip.find({ UID: req.body.UID })
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
