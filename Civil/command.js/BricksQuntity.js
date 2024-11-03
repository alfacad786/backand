import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();
// export function Quntity(req, res) {
  
//   const H = req.body.height;
//   const W = req.body.weight;
//   const D = req.body.depth;
//  const volume =H*W*D
//  const bricksArea = .25*.375*0.75
//  const bricksNo = volume/bricksArea
//   const resio = req.body.rasio;
//   const CivilWork = req.body.CivilWork;
//   const Body = req.body;
//   console.log(Body, "is done*-1*2");

//   if (resio == "M5") {

//      return ([{CivilWork:CivilWork},{ resio: "1:5:10" }, { cement: 1 }, { send: 5 }, { Agriggat: 10 },bricksNo,]);
    
//   }
//   if (resio == "M7.5") {
//     return ([{CivilWork:CivilWork},{ resio: "1:4:8" }, { cement: 1 }, { send: 4 }, { Agriggat: 8 },bricksNo]);
//   }
//   if (resio == "M10") {
//     return ([{CivilWork:CivilWork},{ resio: "1:3:6" }, { cement: 1 }, { send: 3 }, { Agriggat: 6 },bricksNo]);
    
//   }
//   if (resio == "M15") {
//     return ([{CivilWork:CivilWork},{ resio: "1:2:4" }, { cement: 1 }, { send: 2 }, { Agriggat: 4 },bricksNo]);
   
//   }
//   if (resio == "M20") {
//     return ([{CivilWork:CivilWork},{ resio: "1:1.5:3"}, { cement: 1 }, { send: 1.5 }, { Agriggat: 3 },bricksNo]);
  
//   }
//   if (resio == "M25") {
//     return ([{CivilWork:CivilWork},{ resio: "1:1:2"}, { cement: 1 }, { send: 1 }, { Agriggat: 2 },bricksNo]);
   
//   }
//   if (resio == "M25") {
//     return ([{CivilWork:CivilWork},{ resio: "Heigh"}]);
 
//   }
 
// };

export default function bricksQuntity(req, res) { 
 
  const area = H * W * D;

  const H = req.body.height;
  const W = req.body.weight;
  const D = req.body.depth;
 const volume =H*W*D
 const bricksArea = .25*.375*0.75
 const bricksNo = volume/bricksArea
  const resio = req.body.rasio;
  const CivilWork = req.body.CivilWork;
  const Body = req.body;
  console.log(Body, "is done*-1*2");

  if (resio == "M5") {

     return ([{CivilWork:CivilWork},{ resio: "1:5:10" }, { cement: 1 }, { send: 5 }, { Agriggat: 10 },bricksNo,]);
    
  }
  if (resio == "M7.5") {
    return ([{CivilWork:CivilWork},{ resio: "1:4:8" }, { cement: 1 }, { send: 4 }, { Agriggat: 8 },bricksNo]);
  }
  if (resio == "M10") {
    return ([{CivilWork:CivilWork},{ resio: "1:3:6" }, { cement: 1 }, { send: 3 }, { Agriggat: 6 },bricksNo]);
    
  }
  if (resio == "M15") {
    return ([{CivilWork:CivilWork},{ resio: "1:2:4" }, { cement: 1 }, { send: 2 }, { Agriggat: 4 },bricksNo]);
   
  }
  if (resio == "M20") {
    return ([{CivilWork:CivilWork},{ resio: "1:1.5:3"}, { cement: 1 }, { send: 1.5 }, { Agriggat: 3 },bricksNo]);
  
  }
  if (resio == "M25") {
    return ([{CivilWork:CivilWork},{ resio: "1:1:2"}, { cement: 1 }, { send: 1 }, { Agriggat: 2 },bricksNo]);
   
  }
  if (resio == "M25") {
    return ([{CivilWork:CivilWork},{ resio: "Heigh"}]);
 
  }
  console.log(resio, "is resio2");
  return area, resio;


};
