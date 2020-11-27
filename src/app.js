import Axios from 'axios';
import express from 'express';
import database from './config/database';
import dependencies from './config/dependencies';
import logger from './helpers/logger';
import { Client } from './models';
import routes from './config/routes';
var mongoose = require('mongoose');

const app = express();

dependencies(app);
database();
routes(app);

app.get('/', async (req, res) => {
  try {
    // var id = mongoose.Types.ObjectId();
    // const data = await Axios.get(
    //   'https://jsonplaceholder.typicode.com/comments'
    // );
    // var books = [
    //   { name: 'Mongoose Tutorial', price: 10, quantity: 25 },
    //   { name: 'NodeJS tutorial', price: 15, quantity: 5 },
    //   { name: 'MongoDB Tutorial', price: 20, quantity: 2 },
    // ];

    // console.time('test1');
    //
    // console.timeEnd('test1');

    // console.log(123);
    // console.time('test3');
    // await Client.findOneAndDelete({ _id: '5fbf262855e12a117e450c9a' });
    // console.timeEnd('test3');

    // console.time('test2');
    // const da = await Client.findById('5fbf262855e12a117e450c9e').select({
    //   _id: 1,
    // });
    // await Client.deleteOne({ _id: da._id });
    // console.timeEnd('test2');

    console.time('test1');
    const user = await Client.aggregate([
      { $match: { _id: mongoose.Types.ObjectId('5fbf262855e12a117e450cbc') } },
    ]);
    // const user = await Client.findById('5fbf262855e12a117e450cbc');

    // .select({ _id: 1 })
    // .lean();
    console.timeEnd('test1');
    // const account = await Client.create({ _id: id, name: '123' });
    // logger('alo123');
    console.log(user);
    res.json(123);
  } catch (error) {
    console.log(error);
    res.json(123);
  }
});

export default app;
