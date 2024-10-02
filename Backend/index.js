import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DbConnection from './utils/db.js';
import AuthRoutes from './routes/Auth.js';
import AdminRoute from './routes/AdminRoute.js';
import AllRoutes from './routes/AllRoutes.js';
import notificationRoutes from '../Backend/routes/Notifications.js'; 
import socketHandler from './socket/chat.js';
import http from 'http';

import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// MongoDB connection
DbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoute);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
    res.send('test');
});

app.use('/', AllRoutes);
app.use('/api', AllRoutes);

const httpServer  = http.createServer(app);
socketHandler(httpServer);

httpServer.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
