const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs; // Declare gfs here

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFS
    conn.connection.once('open', () => {
      gfs = Grid(conn.connection.db, mongoose.mongo);
      gfs.collection('uploads'); // Use the 'uploads' collection to store files
      console.log('GridFS Stream initialized');
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const getGFS = () => {
  if (!gfs) {
    throw new Error('GridFS is not initialized');
  }
  return gfs;
};

module.exports = { connectDB, getGFS };






