import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();


export default function SOILFILING(req, res) {
  const H = req.body.height;
  const W = req.body.weight;
  const D = req.body.depth;
  const Body = req.body;
  console.log(Body, "is done0002");
  const area = H * W * D;
  // const resio = Quntity(req, res);
  // console.log(resio, "is resio2");
  return area;
};