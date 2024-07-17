import dotenv from "dotenv";
dotenv.config();

import { createInterface } from "readline/promises";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListBucketsCommand,
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

// =============aws_Create_backet====================
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

// =============aws_List_backet====================
export const aws_List_backet = async (req,res) => {
  const command = new ListBucketsCommand({});

  try {
    const { Owner, Buckets } = await s3Client.send(command);
    // console.log(
    //   `${Owner.DisplayName} owns ${Buckets.length} bucket${
    //     Buckets.length === 1 ? "" : "s"
    //   }:`
    // );
   
    // console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
  } catch (err) {
    console.error(err);
  }
};

// =============aws_Uplode_object====================
export async function aws_Uplode_object(projectName, discription, image) {
  // Put an object into an Amazon S3 bucket.
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "aaliya-1721126150278",
      Key: "my-first-object1.txt",
      Body: projectName,
      Metadata: {
        projectName: projectName,
        discription: discription,
        image: image,
      },
    })
  );
}
// =============aws_Read_object====================
export async function aws_Read_object() {
  // Read the object.
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: "my-first-object.txt",
    })
  );

  console.log(await Body.transformToString());
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

// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
import { fileURLToPath } from "url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

////////////////////////////////////////////////////////////////////////////
// *************===========AWS S3Client,===============****************//
////////////////////////////////////////////////////////////////////////////
