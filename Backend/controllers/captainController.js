const captainModel = require("../model/captainModel");
const captainService = require("../services/captainService");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../model/blacklistTokenModel");

module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyexists = await captainModel.findOne({ email });

  if (isCaptainAlreadyexists) {
    return res.status(400).json({ message: " Captain has already existed." });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: "vehicle.color",
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    // console.log(captain)
    if (!captain) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, captain });
  } catch {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  // res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "You have logged out" });
};
