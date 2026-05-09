const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const accountRoutes = require('./routes/account.routes');
const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
module.exports = app;      