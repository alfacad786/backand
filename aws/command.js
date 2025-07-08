import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
// import { uuid } from "v4: uuidv4 ";
import { v4 as uuidv4 } from "uuid";
let uuid = uuidv4();
import { createInterface } from "readline/promises";
import fs from "fs";
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
const Bucket1 = process.env.AWS_BUCKET_NAME_MUMBAI;
const credential = {
  region: process.env.AWS_REGION_MUMBAI,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const s3Client = new S3Client(credential);
const credentialNorth = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
// console.log("aa region mumbai nu=",credential);
// console.log("aa region north nu=",credentialNorth);

const s3ClientNorth = new S3Client(credentialNorth);

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
  // console.log("ye bucket=", bucketName);
  const command = new ListObjectsV2Command({
    Bucket: bucketName,

    MaxKeys: 100,
  });
  // console.log("ye list object ka client hai=", bucketName, credential);
  try {
    let isTruncated = true;
    let objectKeys = [];
    // console.log("Your bucket contains the following objects:\n");
    let contents = "";
let loopCount = 0;
    while (isTruncated) {
       loopCount++;
  if (loopCount > 10) break; // safety guard
      if (bucketName === "aaliya-1721126150278") {
        console.log("ye while me if ka buket name=",bucketName);
        const { Contents, IsTruncated, NextContinuationToken } =
          await s3ClientNorth.send(command);
        //  console.log("**==========",s3ClientNorth.send(command),"======command.jsx,aws_list_object,while,if====**");
        const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
        contents += contentsList + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
        objectKeys = objectKeys.concat(Contents.map((obj) => obj.Key));
        // console.log("ye ho gaya");
      } else {
       console.log("Sending ListObjectsV2Command...");
        const { Contents, IsTruncated, NextContinuationToken } =
          await s3Client.send(command);
          console.log("ListObjectsV2Command received response");
        const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
        contents += contentsList + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
        objectKeys = objectKeys.concat(Contents.map((obj) => obj.Key));
        // console.log("abye ho gaya");
      }
    }

    // Fetch object metadata
    let objectDetails = [];
    for (const key of objectKeys)
      try {
        if (bucketName === "aaliya-1721126150278") {
          // console.log("ye tey-cach me if ka buket name=",bucketName);
          const metaDataCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
          });
          const metaDataResponseNorth = await s3ClientNorth.send(
            metaDataCommand
          );

          const projectName =
            metaDataResponseNorth.Metadata.projectname || "Unknown Project";
          const discription =
            metaDataResponseNorth.Metadata.discription ||
            "No description available";
            const encodedKey = encodeURIComponent(key);
             console.log(encodedKey);
          const imageUrl = `https://${bucketName}.s3.amazonaws.com/${encodedKey}`;
          objectDetails.push({
            Key: key,
            projectName: projectName,
            discription: discription,
            imageUrl: imageUrl,
          });
          // console.log("ye hua");
        } else {
          // console.log("ye tey-cach me else ka buket name=",bucketName);
          const metaDataCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
          });
          const metaDataResponse = await s3Client.send(metaDataCommand);
          const projectName =
            metaDataResponse.Metadata.projectname || "Unknown Project";
          const discription =
            metaDataResponse.Metadata.discription || "No description available";
           const encodedKey = encodeURIComponent(key);
           console.log(encodedKey);
          const imageUrl = `https://${bucketName}.s3.amazonaws.com/${encodedKey}`;
          objectDetails.push({
            Key: key,
            projectName: projectName,
            discription: discription,
            imageUrl: imageUrl,
          });
          // console.error("ab ye hua");
        }
      } catch (err) {
        console.error("ye err aaya", err, "yewala");
      }
    // console.log("objectDetails :", objectDetails);
    res.send(objectDetails);
  } catch (err) {
    console.error("Error fetching list of objects:", err);
    res.status(500).send(err.message);
  }
}

// =============aws_Read_singal_object====================
export async function aws_Read_object(req, res) {
  let key = req.query.objectKey;
  let bucketName = req.query.bucketName;
  console.log("key:", key, "&", "bucketName:", bucketName);
  try {
    if (bucketName === "aaliya-1721126150278") {
      const { Body, Metadata } = await s3ClientNorth.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );

      // Create a signed URL for the image
      const encodedKey = encodeURIComponent(key);
             console.log(encodedKey);
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

      // Read the metadata
      const metadata = {
        projectName: Metadata.projectname,
        discription: Metadata.discription,
      };

      res.json({ data: { imageUrl, ...metadata } });
    } else {
      const { Body, Metadata } = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );

      // Create a signed URL for the image
      const encodedKey = encodeURIComponent(key);
             console.log(encodedKey);
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

      // Read the metadata
      const metadata = {
        projectName: Metadata.projectname,
        discription: Metadata.discription,
      };

      res.json({ data: { imageUrl, ...metadata } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Utility function to convert a readable stream to a string
// const streamToString = (stream) =>
//   new Promise((resolve, reject) => {
//     const chunks = [];
//     stream.on("data", (chunk) => chunks.push(chunk));
//     stream.on("error", reject);
//     stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
//   });
// =============aws_Uplode_object====================
export async function aws_Uplode_object(file, userMetadata) {
  const id = `${userMetadata.projectName}_${uuid}`;
  console.log(id);

  const fileContent = file.buffer;
  const metadata = {
    projectName: userMetadata.projectName,
    discription: userMetadata.discription,
  };

  console.log("fileContent:", fileContent);
  console.log("metadata:", metadata);

  const uploadParams = {
    Bucket: Bucket,
    Key: id,
    Body: fileContent,
    ContentType: file.mimetype,
    Metadata: metadata,
  };

  console.log("body is:", uploadParams, "good");

  const command = new PutObjectCommand(uploadParams);
  const res = await s3Client.send(command);

  console.log("Upload Success", res);
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
export async function aws_Uplode_User(file, userMetadata) {
  const id = `${file.originalname}_${uuid}`;
  console.log(id);
  console.log(userMetadata);
  const fileContent = file.buffer;
  const metadata = {
    FirstName: userMetadata.FirstName,
    LastName: userMetadata.LastName,
    Mobile: userMetadata.Mobile,
    Email: userMetadata.Email,
    Password: userMetadata.Password,
  };

  console.log("fileContent:", fileContent);
  console.log("metadata:", metadata);

  const uploadParams = {
    Bucket: "userdata-1721739838130",
    Key: id,
    Body: fileContent,
    ContentType: file.mimetype,
    Metadata: metadata,
  };

  console.log("body is:", uploadParams, "good");

  const command = new PutObjectCommand(uploadParams);
  const res = await s3Client.send(command);

  console.log("Upload Success", res);
}

// =============aws_Uplode_Product====================
export async function aws_Uplode_Product(file, userMetadata) {
  const Bucket = process.env.Bucket;
  const id = `${file.originalname}_${uuid}`;
  console.log(id);

  const fileContent = file.buffer;
  const metadata = {
    username: userMetadata.UserName,
    password: userMetadata.Password,
    name: userMetadata.Name,
    address: userMetadata.Address,
    mobileno: userMetadata.Mobile,
  };

  console.log("fileContent:", fileContent);
  console.log("metadata:", metadata);

  const uploadParams = {
    Bucket: "userdata-1721739838130",
    Key: id,
    Body: fileContent,
    ContentType: file.mimetype,
    Metadata: metadata,
  };

  console.log("body is:", uploadParams, "good");

  const command = new PutObjectCommand(uploadParams);
  const res = await s3Client.send(command);

  console.log("Upload Success", res);
}

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
