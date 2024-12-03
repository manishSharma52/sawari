const captainModel = require("../model/captainModel");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !vehicleType ||
    !color
  ) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
};

