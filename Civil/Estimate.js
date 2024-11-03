import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
// import { uuid } from "v4: uuidv4 ";
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();
import { createInterface } from "readline/promises";
import fs from "fs";
import bricksQuntity  from "./command.js/BricksQuntity.js";
import ExcavationQuntity from "./command.js/ExcavationQuntity.js";
import SOILFILING from "./command.js/SOILFILLING.js";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

// This is used for getting user input.
const Bucket = process.env.AWS_BUCKET_NAME;
const credential = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const s3Client = new S3Client(credential);

////////////////////////////////////////////////////////////////////////////
// *************===========AWS buckate,===============****************//
////////////////////////////////////////////////////////////////////////////

// =============  aws_Create_backet====================
export async function brickWork(req, res, ) {
  const Body = req.body
  const H = req.body.height;
  const W = req.body.weight;
  const D = req.body.depth;
  // const resio = req.body.search

  console.log(Body,H, W, D, "is done1");

  const area = H * W * D;

   
   const resio=bricksQuntity(req,res);
  

  console.log(area,resio, "----is done----");

  res.json({area,resio});
};

export async function EXCAVATION(req, res, ) {
  const Body = req.body
  const H = req.body.height;
  const W = req.body.weight;
  const D = req.body.depth;
  // const resio = req.body.search

  console.log(Body,H, W, D, "is done1");

  const area = H * W * D;

   
   const resio=ExcavationQuntity(req,res);
  

  console.log(area,resio, "----is done----");

  res.json({area,resio});
}

export async function YELLOW_SOIL_FILING(req, res, ) {
  const Body = req.body
  const H = req.body.height;
  const W = req.body.weight;
  const D = req.body.depth;
  // const resio = req.body.search

  console.log(Body,H, W, D, "is done1");

  const area = H * W * D;

   
   const resio=SOILFILING(req,res);
  

  console.log(area,resio, "----is done----");

  res.json({area,resio});
}
