import dotenv from "dotenv";
dotenv.config();
import multer from 'multer';
// import { uuid } from "v4: uuidv4 ";
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();
import { createInterface } from "readline/promises";
import fs from 'fs';
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

////////////////////////////////////////////////////////////////////////////
// *************===========AWS S3Client,===============****************//
////////////////////////////////////////////////////////////////////////////

// This is used for getting user input.

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
export async function aws_Create_backet(name) {
  const bucket_Name = `${name}-${Date.now()}`;
  // Create an Amazon S3 bucket.
  console.log("bucket_Name:", bucket_Name, "is done");
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: bucket_Name,
    })
  );
  console.log("is done");
}

// =============aws_Delete_bucket====================
export async function aws_Delete_bucket() {
  const paginator = paginateListObjectsV2(
    { client: s3Client },
    { Bucket: bucketName }
  );
  for await (const page of paginator) {
    const objects = page.Contents;
    if (objects) {
      // For every object in each page, delete it.
      for (const object of objects) {
        await s3Client.send(
          new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
        );
      }
    }
  }
  // Once all the objects are gone, the bucket can be deleted.
  await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
}
////////////////////////////////////////////////////////////////////////////
// *************===========AWS buckate,===============****************//
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// *************===========AWS s3 bucket  object,===============****************//
////////////////////////////////////////////////////////////////////////////

// =============aws_List_object====================
export async function aws_list_object(req, res, bucketName) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 100,
  });
  console.log("ListObject  comand ka Bucket:", bucketName);
  try {
    let isTruncated = true;
    let objectKeys = [];

    // console.log("Your bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3Client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
      objectKeys = objectKeys.concat(Contents.map((obj) => obj.Key));
      // console.log("ListObjects :",contents);
      res.send(objectKeys);
    }
    // console.log("ListObjects  key :",objectKeys);
  } catch (err) {
    console.error(err);
  }
}

// =============aws_Read_singal_object====================
export async function aws_Read_object(req, res) {
  let key = req.query.objectKey;
  let bucketName = req.query.bucketName;
  console.log(
    "bucketName Readobject ka :",
    bucketName,
    "or",
    "key Readobject ka :",
    key,
    "hai"
  );
  // Read the object.
  console.log("backand bucketName :", bucketName);
  console.log("backand key :", key);
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
  // console.log(await Body.transformToString());
  res.send(await Body.transformToString());
}

// =============aws_Uplode_object====================
export async function aws_Uplode_object(body) {
  const { projectName } = body;
  const id = `${projectName}_${uuid}`;
  const bodyContent = JSON.stringify(body);
  // const body = req.Body
  // Put an object into an Amazon S3 bucket.
  console.log("body is:", body, "good");
  // console.log (`thisis",${projectName}_${uuid},"and uuid`)
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "aaliya-1721126150278",
      Key: id,
      Body: bodyContent,
    })
  );
}

// =============aws_Delete_object====================

export async function aws_Delete_object() {
  // Confirm resource deletion.
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const result = await prompt.question("Empty and delete bucket? (y/n) ");
  prompt.close();

  if (result === "y") {
    // Create an async iterator over lists of objects in a bucket.
    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: bucketName }
    );
    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        // For every object in each page, delete it.
        for (const object of objects) {
          await s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
          );
        }
      }
    }
  }
}
// =============aws_Uplode_User====================
export async function aws_Uplode_User(file) {

    const { Name, Mobile, Email, UserName, Password, Image } = file;
    const id = `${file.originalname}_${uuid}`;
    console.log(id);



    const filePath = file.path;
    const fileContent = fs.readFileSync(filePath);
    const base64Image = fileContent.toString('base64');   

   
    const data = {
      // username: UserName,
      // password: Password,
      // Name: Name,
      // Mobile: Mobile,
      // Email: Email,
      fileContent: base64Image,
    };

    const bodyContent = JSON.stringify(data);

    const uploadParams = {
      Bucket: "userdata-1721739838130",
      Key: id,
      Body: bodyContent,
      // ContentEncoding: 'base64', // Optional, but good to have
      // ContentType: Image.mimetype // Optional, but good to have
    };

    console.log("body is:", uploadParams, "good");
    const command = new PutObjectCommand(uploadParams);
    const res = await s3Client.send(command);

    console.log("Upload Success", res);
  } ;

////////////////////////////////////////////////////////////////////////////
// *************===========AWS s3 bucket  object,===============****************//
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// *************===========AWS S3Client,===============****************//
////////////////////////////////////////////////////////////////////////////
// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
// import { fileURLToPath } from "url";
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   main();
// }

////////////////////////////////////////////////////////////////////////////
// *************===========AWS S3Client,===============****************//
////////////////////////////////////////////////////////////////////////////
