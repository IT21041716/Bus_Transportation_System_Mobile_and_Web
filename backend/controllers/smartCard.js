import SmartCard from "../models/smartCard.js";

export const addSmartCard = async (req, res) => {
  try {
    const uId = req.body.uId;
    const fullName = req.body.fullName;
    const nic = req.body.nic;
    const dob = req.body.dob;
    const address = req.body.address;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const status = req.body.status;

    // pid create 
    const prefix = "PID";
    const PID = (prefix + "_" + Date.now())

    const newSmartCard = new SmartCard({
      uId: uId,
      PID: PID, // new one
      fullName: fullName,
      nic: nic,
      dob: dob,
      address: address,
      city: city,
      postalCode: postalCode,
      status: status,
      balance: 0 // new one
    });

    const newSaCd = await newSmartCard.save();

    if (newSaCd) {
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