import mongoose from 'mongoose';

// Define MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI; // Ensure you have set this environment variable

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;
