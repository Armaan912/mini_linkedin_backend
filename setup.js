// setup.js
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const createDirectories = () => {
  const dirs = ['uploads', 'logs'];
  dirs.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
      console.log(`Created directory: ${dir}`);
    }
  });
};

const runSetup = async () => {
  try {
    await connectDB();
    createDirectories();

    // Optional: Add seeding logic or migrations here
    // await seedUsers();
    // await seedProducts();

    console.log('Setup completed.');
    process.exit(0);
  } catch (err) {
    console.error('Setup failed:', err);
    process.exit(1);
  }
};

runSetup();
