import mongoose, { MongooseError } from 'mongoose';

let urlConnectDataBase = process.env.URL_DATABASE;
if (process.env.DATABASE_USER)
  urlConnectDataBase = urlConnectDataBase.replace('username', process.env.DATABASE_USER)

if (process.env.DATABASE_PASSWORD)
  urlConnectDataBase = urlConnectDataBase.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.set("strictQuery", false);
mongoose
  .connect(urlConnectDataBase,{dbName:'eshops-database-test'})
  .then(() => {
    console.log('Connect to MongoDB');
  })
  .catch((err: MongooseError) => console.log(err));
