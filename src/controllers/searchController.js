// import { Project } from '../models';
import { model } from 'mongoose';
import { handleResponse } from '../helpers/response';
import capitalizeFirstLetter from '../services/capitalizeFirstLetter';

export { getSearchResult };

const getSearchResult = async (req, res) => {
  try {
    const { orderBy, page = 1, limit, sortBy, modelName, name } = req.query;
    const perPage = Number(limit);
    const start = (Number(page) - 1) * perPage;
    const record = await model(capitalizeFirstLetter(modelName))
      .find({ name: new RegExp(name, 'i') })
      .sort([[sortBy, orderBy]])
      .skip(start)
      .limit(perPage);

    const response = handleResponse(
      200,
      'Get result successfully',
      'GET_RESULT_SUCCESSFULLY',
      { record }
    );
    return res.status(response.status).json(response);
    res.json({ record });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};
