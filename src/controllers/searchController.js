// import { Project } from '../models';
import { model } from 'mongoose';
import capitalizeFirstLetter from '../services/capitalizeFirstLetter';

export { getSearchResult };

const getSearchResult = async (req, res) => {
  try {
    const { orderBy, page = 1, limit, sortBy, modelName } = req.query;
    const perPage = Number(limit);
    const start = (Number(page) - 1) * perPage;
    const record = await model(capitalizeFirstLetter(modelName))
      .find({})
      .sort([[sortBy, orderBy]])
      .skip(start)
      .limit(perPage);
    res.json({ record });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};
