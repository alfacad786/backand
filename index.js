import express from "express";
const app = express();
const router = express.Router();
import cors from "cors";
import fs from 'fs';
import multer from 'multer';
// Upload instead from @aws-sdk/lib-storage

// import AWS from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-s3";
const upload = multer({ dest: 'uploads/' });


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

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


const credential = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const s3Client = new S3Client(credential);

import {
  aws_Create_backet,
  aws_Delete_bucket,
  aws_Uplode_object,
  aws_Read_object,
  aws_Delete_object,
  aws_list_object,
  aws_Uplode_User
} from "./aws/command.js";

// import { configDotenv } from "dotenv";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import user from "./models/user.js";
import product from "./models/Product.js";
import { Admin, MongoClient } from "mongodb";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================================================
const corsOptions = {
  origin: `http://localhost:5173`,
  mathods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// ==================================================

const dburl = process.env.DB_Web1_URL;
console.log("this is :", dburl, port, "-over url");

// ==================================================
// mongodb server se connection ka code( 2 alternativ)
// ==================================================
// 1
// ==================================================
const mongodbconect = mongoose.connect(dburl);

async function main() {
  await mongodbconect;
}
main()
  .then((res) => {
    console.log("conection sussecfull");
  })
  .catch((err) => console.log(err, "conection not sussecfull"));

// ==================================================

// =====================================================================================
app.listen(port || 3000, () => {
  console.log(`Listening to the server at http://localhost:${port}`);
});
// =====================================================================================
router.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif",
      title: "alfa",
      id: 1,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ex doloribus, sequi voluptates quae quos ut. Illo, blanditiis. Fuga magnam eligendi, asperiores ab facere aliquid laudantium molestias ipsam quas alias at, doloremque fugiat debitis sequi aspernatur et amet commodi dolorum perferendis. Fugit accusantium numquam quia ab vel, accusamus impedit facilis",
    },
    {
      img: "./SULEKH1.jpg",
      link: "https://www.google.com/",
      name: "ayan",
      title: "alfa",
      id: 2,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque accusamus eaque aliquid cumque minus at porro dicta, veritatis natus obcaecati quas rem, eveniet veniam possimus doloremque vel unde sint minima adipisci. Illo, fuga! Hic cum quos vero iure accusamus eligendi. Possimus ea tempore quam quae dignissimos ducimus quos provident numquam ab delectus, cupiditate et dolores animi incidunt. Natus labore, doloribus quis facere culpa laborum officia ipsam reiciendis porro necessitatibus similique",
    },
    {
      img: "./SUNRISE1.jpg",
      link: "https://www.google.com/",
      name: "aaliya",
      title: "alfa",
      id: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quas repudiandae perferendis pariatur reiciendis voluptas, explicabo ad recusandae ab praesentium quam necessitatibus ut obcaecati veniam non nemo quaerat ex suscipit.",
    },
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif",
      title: "alfa",
      id: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid iure totam obcaecati exercitationem consectetur sunt ab quod, quibusdam atque nemo.",
    },
    {
      name: "ayan",
      title: "alfa",
      id: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis cumque accusamus quod sunt ipsum qui impedit vel placeat saepe ullam eius ipsa ea dolore dolorum, tempore accusantium, autem, reprehenderit odio delectus corporis sit? Mollitia sit, magni adipisci corporis hic molestias.",
    },
    {
      name: "aaliya",
      title: "alfa",
      id: 6,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur itaque saepe quaerat voluptas, provident voluptate?",
    },
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif1",
      title: "alfa",
      id: 7,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci neque obcaecati molestiae commodi fugit sequi tempora nobis placeat eaque facilis.",
    },
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif2",
      title: "alfa",
      id: 8,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt modi iste deleniti? Esse voluptates laudantium nulla cum. Quas laborum repudiandae alias repellendus. Iure repellendus placeat aliquam! Molestiae reiciendis dolor iusto culpa quaerat, error at voluptatem aliquid? Autem saepe ab non ducimus placeat, sint est amet?",
    },
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif3",
      title: "alfa",
      id: 9,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam eius, consequatur perspiciatis commodi voluptas deleniti, quo incidunt ut laboriosam impedit maxime expedita accusantium iure nihil enim est aperiam reiciendis velit ad voluptatum.",
    },
    {
      img: "./MAYURI1.jpg",
      link: "https://www.google.com/",
      name: "asif4",
      title: "alfa",
      id: 10,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae reiciendis, eum sunt obcaecati, quibusdam, iusto porro facere a consequatur ipsam veritatis facilis. Magni nisi reiciendis accusantium totam expedita cumque quae, ratione ex praesentium ut vel officiis officia ea minima at molestias veniam aliquid. Quasi eos labore est animi!",
    },
  ];

  res.send(jokes);
  console.log(jokes);
});
// =====================================================================================
app.get("/", (req, res) => {
  res.send({ users1 });
  // res.render(Top);
});

// =================== new user signup ========================================

app.post("/api/signup", async (req, res) => {
  const body = req.body;
  console.log("body:", body);
  // res.json({ body });

  let { username, password, email } = body;
  console.log("New User:", { username, password, email });
  let chekuser = await user.findOne({ username: username });

  if (!chekuser) {
    const newUser = new user({
      username: username,
      password: password,
      email: email,
    });

    newUser
      .save()
      .then((res) => {
        console.log(res, "save user");
        console.log(" add data");
      })
      .catch((err) => {
        console.log(err, "user not save");
      });
    res.send(newUser._id);
    // res.redirect("/trust/user/logpage/");
    // console.log(" data match");
  } else {
    // res.render("errer userrejistration.ejs");
    console.log(" match the userName");
    console.log(username, chekuser);
    // res.render("loginerror.ejs");
  }

  // -------------------------------//
  // try {
  // let { username, password, email } = body;
  // console.log("New User:", { username, password, email });
  // let chekuser = await user.findOne({ username: username });

  // if (!chekuser) {
  //   const newUser = new user({
  //     username: username,
  //     password: password,
  //     email: email,
  //   });

  //     await newUser.save();
  //     console.log("New user save successful");
  //     res.status(201).json({ message: "User created successfully" });
  //   } else {
  //     console.log("Username already exists");
  //     res.status(400).json({ message: "Username already exists" });
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

// ===================loging========================

app.post("/api/login", async (req, res) => {
  let { username, password } = req.body;

  const loguser = await user.findOne(
    { username: username } || { password: password }
  );
  const id = loguser._id;

  if (!loguser) {
    res.send("please valide username or passwerd");
  } else {
    res.send({
      massage: "welcom",
      id: id,
      redirectUrl: `/userportal/${id}`,
    });
    console.log("welcom", loguser.username);
  }
});

// ===================product save========================

app.post("/api/product", async (req, res) => {
  const body = req.body;
  console.log("body:", body);
  // res.json({ body });

  let { projectName, discription, image } = body;
  console.log("New product:", { projectName, discription, image });
  let chekproduct = await product.findOne({ projectName: projectName });

  if (!chekproduct) {
    const newproduct = new product({
      projectName: projectName,
      discription: discription,
      image: image,
    });

    newproduct
      .save()
      .then((res) => {
        console.log(res, "save newproduct");
        console.log(" add data");
      })
      .catch((err) => {
        console.log(err, "user not save");
      });
    console.log("ok", newproduct, "good");
    res.json(newproduct);
    // res.redirect("/trust/user/logpage/");
    // console.log(" data match");
  } else {
    // res.render("errer userrejistration.ejs");
    console.log(" match the projectName");
    console.log(projectName, chekproduct);
    // res.render("loginerror.ejs");
  }

  // -------------------------------//
  // try {
  // let { username, password, email } = body;
  // console.log("New User:", { username, password, email });
  // let chekuser = await user.findOne({ username: username });

  // if (!chekuser) {
  //   const newUser = new user({
  //     username: username,
  //     password: password,
  //     email: email,
  //   });

  //     await newUser.save();
  //     console.log("New user save successful");
  //     res.status(201).json({ message: "User created successfully" });
  //   } else {
  //     console.log("Username already exists");
  //     res.status(400).json({ message: "Username already exists" });
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

// ===========card me data accses kerne ke liya useEfect me call===============
app.get("/api/product/data/", async (req, res) => {
  try {
    let products = await product.find();

    // console.log("product is", {products},"then");
    res.json(products);
  } catch (err) {
    console.log("err", { product }, "err");
  }
});

// ===========CREATE BUCKET IN AWS S3===============
app.post("/api/creatBacket/", (req, res) => {
  const body = req.body;
  const name = body.bucketName;
  console.log("body:", name);

  aws_Create_backet(name);
});
// ===========List BUCKET IN AWS S3===============
app.get("/api/ListBuckets/", async (req, res) => {
  // const body = req.body;
  // const name = body.bucketName;
  // console.log("body:", name);
  const command = new ListBucketsCommand({});

  try {
    const { Owner, Buckets } = await s3Client.send(command);
    // console.log(
    //   `${Owner.DisplayName} owns ${Buckets.length} bucket${
    //     Buckets.length === 1 ? "" : "s"
    //   }:`
    // );
    // console.log(Buckets);
    res.json(Buckets);
    // console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
  } catch (err) {
    console.error(err);
  }
});

// ===========DELETE BUCKET FOR  AWS S3 ===============
app.post("/api/delateBucket/", (req, res) => {
  const body = req.body;
  const name = body.bucketName;
  console.log("body:", name);

  aws_Delete_bucket(name);
});

// ===========UPDATE OBJECT IN AWS S3 BUCKETS===============
app.post("/api/UPDATE/", (req, res) => {
  const { projectName, discription, image } = req.body;
  const body = { projectName, discription, image };
  console.log(body.projectName);

  aws_Uplode_object(body);
});

// ===========READ OBJECT IN AWS S3 BUCKETS===============

app.get("/api/READ/", (req, res) => {
  // console.log("key:", key,);
  // Process the bucketName as needed

  aws_Read_object(req, res);
  // res.send(`Bucket name received: ${bucketName}`);
});

// ===========DELETE OBJECT IN AWS S3 BUCKETS===============
app.post("/api/DELETE/", (req, res) => {
  const body = req.body;
  const name = body.bucketName;
  console.log("body:", body);

  aws_Delete_object(name);
});

// ===========List OBJECT IN AWS S3 BUCKETS===============
app.get("/api/ListObject/", (req, res) => {
  // let key = req.query.objectKey;
  let bucketName = req.query.bucketName;
  console.log("ListObject ka bucketName:", bucketName);
  // console.log("ListObject ki key:", key,);
  // Process the bucketName as needed

  aws_list_object(req, res, bucketName);

  // const objectKeys = data.Contents.map(obj => obj.Key);
  // res.send(objectKeys);

  // res.send(`Bucket name received: ${bucketName}`);
});
app.post("/api/newUser/",upload.single('image'), (req, res) => {
  // const { Name, Mobile, Email,UserName,Password,Image } = req.body;
  // this.image = file.name;
  const body = req.body;
  const file = req.file;
  console.log("*",file,"12");
  // this.image = file.name;

  aws_Uplode_User(file);
  res.send("User added successfully!");
});



// fileEvent(fileInput: any) {
//   const AWSService = AWS;
//   const region = '<insert your region here>';
//   const bucketName = '<insert your bucket name>';
//   const IdentityPoolId = '<insert your identity pool id>';
//   const file = fileInput.target.files[0];
// //Configures the AWS service and initial authorization
//   AWSService.config.update({
//     region: region,
//     credentials: new AWSService.CognitoIdentityCredentials({
//       IdentityPoolId: IdentityPoolId
//     })
//   });
// //adds the S3 service, make sure the api version and bucket are correct
//   const s3 = new AWSService.S3({
//     apiVersion: '2006-03-01',
//     params: { Bucket: bucketName}
//   });
// //I store this in a variable for retrieval later
//   this.image = file.name;
//   s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
//    if (err) {
//      console.log(err, 'there was an error uploading your file');
//    }
//  });
// }