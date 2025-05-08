const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');

const app = express();
const PORT = 4000;

const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/krishi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
