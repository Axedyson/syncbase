import { PORT } from "./config/constants";
import { startServer } from "./server";

startServer(PORT).catch(console.error);
