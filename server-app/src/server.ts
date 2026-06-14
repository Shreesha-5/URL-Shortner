import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDb();
const app = express();
app.use(express.json())
app.use(express.urlencoded ({ extended:true}))

app.use(cors({
  origin:"https://url-shortner-frontend-5j40.onrender.com",
  credentials:true,
}));

const port = 5001;
app.use("/api/",shortUrl);

app.get("/api/contacts", (req, res) => {
    res.status(200).json({message:"get all contacts"})
    
});

// ✅ FIXED HERE: Assiging the running server to a variable
const server = app.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
});

// Clean shutdown handler
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('Server closed. Port 5001 is completely free.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});