const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/mentor', require('./routes/mentor'));
app.use('/api/session', require('./routes/session'));
app.use('/api/payout', require('./routes/payout'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/audit', require('./routes/audit'));
app.use('/api/auth', require('./routes/auth'));


app.get('/', (req, res) => res.send('EdTech Payout Automation API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
