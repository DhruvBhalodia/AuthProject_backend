const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const routes = require('./indexRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true           
}));
app.use(cookieParser());
connectDB();

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
