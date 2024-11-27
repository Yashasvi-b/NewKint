// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const crypto = require('crypto');
// const User = require('./models/User');


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { email, pd } = req.body;

//   if (!email || !pd) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const SALT = 'fhgy45f';
//     const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const newUser = new User({ email, pd: passwordEncrypted });
//     await newUser.save();
//     res.status(201).json({ message: 'Signup successful' });
//   } catch (error) {
//     console.error('Signup Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, pd } = req.body;

//   if (!email || !pd) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const SALT = 'fhgy45f';
//     const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

//     // Check if the user exists
//     const user = await User.findOne({ email, pd: passwordEncrypted });

//     if (user) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const crypto = require('crypto');
const User = require('./models/User');
const User2=require('./models/User2') // Correct import of the User model

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5002;
const PORT =5002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('MongoDB connection error:', err.message));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, pd } = req.body;

    // Validate input
    if (!email || !pd) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Password encryption with a static salt
    const SALT = 'fhgy45f';
    const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save a new user
    const newUser = new User({ email, pd: passwordEncrypted });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, pd } = req.body;

    // Validate input
    if (!email || !pd) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Encrypt the provided password for comparison
    const SALT = 'fhgy45f';
    const passwordEncrypted = crypto.createHash('sha1').update(pd + SALT).digest('hex');

    // Find user with matching email and encrypted password
    const user = await User.findOne({ email, pd: passwordEncrypted });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});





// app.post("/api/save-progress", async (req, res) => {
//   try {
//     const { userId, progress } = req.body;

//     // Save or update progress in the database
//     await User2.updateOne({ _id: userId }, { progress }, { upsert: true });

//     res.status(200).json({ message: "Progress saved successfully" });
//   } catch (error) {
//     console.error("Error saving progress:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.get("/api/get-progress/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User2.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ progress: user.progress });
//   } catch (error) {
//     console.error("Error fetching progress:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/save-progress", async (req, res) => {
//   try {
//     const { userId, progress } = req.body;

//     // Validate userId
//     const user = await User2.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Save or update progress in the database
//     user.progress = progress;
//     await user.save();

//     res.status(200).json({ message: "Progress saved successfully" });
//   } catch (error) {
//     console.error("Error saving progress:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.get("/api/get-progress/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     const user = await User2.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ progress: user.progress });
//   } catch (error) {
//     console.error("Error fetching progress:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
