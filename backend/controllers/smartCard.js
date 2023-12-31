import SmartCard from "../models/smartCard.js";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/config.js";

export const addSmartCard = async (req, res) => {
  try {
    const uId = req.body.uId;
    const fullName = req.body.fullName;
    const nic = req.body.nic;
    const dob = req.body.dob;
    const uEmail = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const status = "Requested";

    // // pid create
    // const prefix = "PID";
    // const PID = (prefix + "_" + Date.now())

    const newSmartCard = new SmartCard({
      uId: uId,
      PID: "Null", // new one
      fullName: fullName,
      nic: nic,
      dob: dob,
      uEmail:uEmail,
      address: address,
      city: city,
      postalCode: postalCode,
      status: status,
      balance: 0, // new one
    });

    console.log(newSmartCard)
    console.log(EMAIL,PASSWORD)

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    };

    let transpoter = nodemailer.createTransport(config);

    let MailGenereto = new Mailgen({
      theme: "default",
      product: {
        name: "City Linx",
        link: "https://mailgen.js/",
      },
    });

    console.log('hari')

    let response = {
      body: {
        name: fullName,
        intro: "Smart Card Requested Successfully!",
        table: {
          data: [
            {
              Name: fullName,
              statuss: status,
              date: new Date(),
            },
          ],
        },
        outro: "Stay tune!",
      },
    };

    console.log('hari2')


    let mail = MailGenereto.generate(response);
    console.log('hari4')

    let message = {
      from: EMAIL,
      to: uEmail,
      subject: "Smart card",
      html: mail,
    };
    console.log('hari5')

    transpoter.sendMail(message);
    console.log('hari6')

    const newSaCd = await newSmartCard.save();
    console.log('hari7')

    if (newSaCd) {
      console.log('hari3')

      res.status(200).json({
        message: "New Smart Card Added",
        payload: newSaCd,
      });
    } else {
      res.status(400).json({
        message: "Smart Card Added Error",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err,
    });
  }
};

export const getAllSmartCards = async (req, res) => {
  try {
    const sati = await SmartCard.find();
    if (sati) {
      res.status(200).json({
        payload: sati,
      });
    } else {
      res.status(404).json({
        message: "Error in getting Smart cards",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getOneSmartCard = async (req, res) => {
  try {
    const id = req.params.id;
    const sati = await SmartCard.findById(id);

    if (sati) {
      res.status(200).json({
        payload: sati,
      });
    } else {
      res.status(404).json({
        message: "Error in getting smart card",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateSmartCard = async (req, res) => {
  try {
    const id = req.params.id;
    const sati = await SmartCard.findById(id);
    const com = {
      uId: sati.uId,
      fullName: req.body.fullName,
      nic: req.body.nic,
      dob: req.body.dob,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      status: req.body.status,
    };

    const upCom = await SmartCard.findByIdAndUpdate(id, com);
    if (upCom) {
      res.status(200).json({
        payload: com,
      });
    } else {
      res.status(404).json({
        message: "Error in updating smart card",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteSmartCard = async (req, res) => {
  try {
    const id = req.params.id;
    const sati = await SmartCard.findByIdAndDelete(id);
    if (sati) {
      res.status(200).json({
        message: "Smart card deleted",
      });
    } else {
      res.status(404).json({
        message: "Error in deleting samrt card",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
