import { connect } from 'mongoose';

export default () => {
  connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
