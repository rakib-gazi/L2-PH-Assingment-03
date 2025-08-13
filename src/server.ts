import {Server} from 'http'
import app from "./app";
import mongoose from "mongoose";
let server: Server;
const port = 5000;

async function bootstrap() {
  try {
    await mongoose.connect('mongodb+srv://library:2qxWCoC94pfqtpU6@cluster0.whnyl.mongodb.net/LibraryDB?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
