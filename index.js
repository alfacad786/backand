import express from "express";
const app = express();
const router = express.Router();
import cors from "cors";
// import { configDotenv } from "dotenv";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import { MongoClient } from "mongodb";
// import Top from "../frontend/src/Top";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================================================
const corsOptions = {
  origin: "http://localhost:5173",
  mathods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// ==================================================

const dburl = process.env.DB_URL;
console.log("this is :", dburl, port, "-over url");

// ==================================================
// mongodb server se connection ka code( 2 alternativ)
// ==================================================
// 1
// ==================================================
// async function main() {
//   await mongoose.connect(dburl);
// }
// main()
//   .then((res) => {
//     console.log("conection sussecfull");
//   })
//   .catch((err) => console.log(err, "conection not sussecfull"));

// ==================================================
//2
// ==================================================
const client = new MongoClient(dburl);
const db = client.db("test");
async function listCollections() {
  try {
    console.log("conection sussecfull");
    // MongoDB server se connect karein
    await client.connect();

    // Database select karein
    // const db = client.db("test"); // yahan apna database name daalein

    // Collections ki list lein
    const collections = await db.listCollections().toArray();

    // Collections print karein
    console.log(
      "collections:",
      collections.map((col) => col.name)
    );
    console.log("this is collections:",collections);
  } catch (err) {
    console.log("conection not sussecfull");
    console.error(err);
  }
 
}

listCollections();
const user = db.collection("user1");
const users1 = await user.find({}).toArray();

const admins1 = db.collection("admins");
const admins = await admins1.find({}).toArray();

const userdetails1 = db.collection("userdetails");
const userdetails = await userdetails1.find({}).toArray();

users1.forEach(user => {console.log("user:",user);});
admins.forEach(admins => {console.log("admins:",admins);});
userdetails.forEach(userdetails => {console.log("userdetails:",userdetails);});


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

app.get("/", (req, res) => {
  res.send({users1});
  // res.render(Top);
});

app.post("/api/signup", async (req, res) => {
  const body = req.body;
  let { userName, password, email } = body;
  console.log("New User:", { userName, password, email });

  let chekuser = await user.findOne({ userName: userName });

  res.json({ body });
});

app.post("/api/login", (req, res) => {
  const body = req.body;
  console.log("username:", body.username, "||", "password:", body.password);
  res.json({ body });
});
