import express from 'express';
import sequelize from './models/index.js'

const app = express();

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection();


const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, server.js!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});