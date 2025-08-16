"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const port = 5000;
async function bootstrap() {
    await mongoose_1.default.connect('mongodb+srv://library:2qxWCoC94pfqtpU6@cluster0.whnyl.mongodb.net/LibraryDB?retryWrites=true&w=majority&appName=Cluster0');
    server = app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
bootstrap();
