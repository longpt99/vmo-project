import { model } from 'mongoose';
import { handleError, handleResponse } from '../helpers/response';
import capitalizeFirstLetter from '../services/capitalizeFirstLetter';

export { getSearchResult };

const getSearchResult = async (query) => {
  try {
    const { orderBy, page = 1, limit, sortBy, modelName, name } = query;
    const perPage = Number(limit);
    const start = (Number(page) - 1) * perPage;
    const record = await model(capitalizeFirstLetter(modelName))
      .find({ name: new RegExp(name, 'i') })
      .sort([[sortBy, orderBy]])
      .skip(start)
      .limit(perPage);

    return handleResponse(
      200,
      'Get result successfully',
      'GET_RESULT_SUCCESSFULLY',
      record
    );
  } catch (error) {
    return handleError(error);
  }
};
