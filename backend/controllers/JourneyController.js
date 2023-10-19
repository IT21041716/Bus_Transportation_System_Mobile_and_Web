import Journey from "../models/journey.js";

export const createJourney = async (req, res) => {
  try {
    const { createdBy, reservedDate, reason, status, location, price } =
      req.body;

    const journey = new Journey({
      createdBy,
      reservedDate,
      reason,
      status,
      location,
      price,
    });

    const savedJourney = await journey.save();

    res.status(201).json(savedJourney);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getJourneys = async (req, res) => {
  try {
    const Journeys = await Journey.find();
    res.status(200).json(Journeys);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getJourneyById = async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await Journey.findById(id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    res.status(200).json(journey);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getJourneyByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await Journey.find({ createdBy: id });

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    res.status(200).json(journey);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason, reservedDate, location } = req.body;

    await Journey.findByIdAndUpdate(
      id,
      { location, reservedDate, status, reason },
      { new: true }
    );
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await Journey.findById(id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    await Journey.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
