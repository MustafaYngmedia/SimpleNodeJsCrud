const path = require('path');
const axios = require('axios')

validatePhone = function(phone){
  //validatePhone for validating the phoneNumber
  let re = /^(\+\d{3})?\d{10}$/;
  return re.test(phone.replace(/\s+/g, ''));
}

verifyObjectId = (Id) => {
if(ObjectID.isValid(Id))
  return true
else
  return false
}

alreadyExistTitle = async(model,name) => {
  return await model.find({name:name}).countDocuments();
}

alreadyExist = async(model,query) => {
  return await model.find(query).countDocuments();
}

makeInstance = async(model,data,id) => {
  let instance;
  if(id == null){
      instance = new model;
  }else{
      instance = await model.findById(id);
      if(instance == null){
          return TE('Cannot Found Instance')
      }
  }
  Object.keys(data).map((key,) => {
      instance[key] = data[key];
  })
  return await instance.save();
}

TE = function (err, code,log) {
  // TE stands for Throw Error, showing error in development mode only
  let _err;
  switch (true) {
    case typeof err.code === "number" && err.code === 11000:
      _err = "Record already exist.";
      break;
    default:
      _err = err;
      break;
  }
  if (process.env.NODE_ENV === "development") {
    console.error(log)
  }
  throw new Error(_err,code);
};

ReE = function (res, err, code, log) {
  if (process.env.NODE_ENV === "development") {
    console.error(`Error logged from API :${log}`);
  }
  let send_data = { success: false };
  if (typeof code !== "undefined") res.statusCode = code;

  if (err instanceof Error && typeof err.message != "undefined") {
    err = err.message;
  } else {
    send_data = { ...send_data, ...err }; //merge the objects
    return res.json(send_data);
  }
  console.log(err)
  return res.json({ success: false, message: err },code);
};

ReS = function (res, data, code) {
  let send_data = { success: true };
  if (typeof data === "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);
};


const avaiblesFileTypes = ['jpeg','jpg','gif','mp4','png']
