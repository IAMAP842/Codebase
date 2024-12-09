import express from 'express';
import dotenv from 'dotenv';
import DBCon from './libs/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/Auth.js';
// import UserRoutes from './routes/User.js';  // Uncomment if needed
import DashboardRoutes from './routes/DashBoard.js';
// import CommentRoutes from './routes/Comments.js';  // Uncomment if needed
import PublicRoutes from './routes/public.js';
import Router from './routes/filter.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
DBCon();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('hello from server');
});
app.use(express.static('public'));
app.use(cookieParser());

// Corrected typo here: `corsOptions`
app.use(cors());


// const corsOptions = {
//     origin: true,
//     credentials: true,
// };
// app.use(cors(corsOptions));

// const corsOptions = {
//     origin: "https://codebaseclient.vercel.app",
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
// };
// app.use(cors(corsOptions));

// const corsOptions = {
//     origin: "https://codebaseclient-git-rohit-abhilash-kumars-projects-289775f5.vercel.app",
//     credentials: true,
// };
// app.use(cors(corsOptions));



// app.use(cors({
//   origin: 'https://codebaseclient-git-rohit-abhilash-kumars-projects-289775f5.vercel.app', // Frontend URL
//   methods: 'GET,POST,PUT,DELETE', // Allowed methods
//   credentials: true, // Include credentials (cookies)
// }));



// const corsOptions = {
//     origin: (origin, callback) => {
//         const allowedOrigins = ['https://codebaseclient.vercel.app'];
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, origin);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true, // Allow cookies and authentication headers
// };
// app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: true, // Cookies will only be sent over HTTPS
//         sameSite: 'None', // Required for cross-origin requests
//     },
// }));


app.use('/auth', AuthRoutes);
// app.use('/user', UserRoutes);  // Uncomment if needed
app.use('/dashboard', DashboardRoutes);
// app.use('/comment', CommentRoutes);  // Uncomment if needed
app.use('/public', PublicRoutes);

app.use('/user', Router);  // `Router` is being used here for the `/filter` route

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
