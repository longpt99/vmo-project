import { model } from 'mongoose';
import { handleError, handleResponse } from '../helpers/response';
import capitalizeFirstLetter from '../services/capitalizeFirstLetter.service';

export { getSearchResult };

const getSearchResult = async (query) => {
  try {
    const { orderBy, page = 1, limit, sortBy, modelName, name } = query;
    const perPage = Number(limit);
    const start = (Number(page) - 1) * perPage;
    const [record, number] = await Promise.all([
      model(capitalizeFirstLetter(modelName))
        .find({ name: new RegExp(name, 'i') })
        .sort([[sortBy, orderBy]])
        .skip(start)
        .limit(perPage),
      model(capitalizeFirstLetter(modelName)).countDocuments(),
    ]);
    return handleResponse(
      200,
      'Get result successfully',
      'GET_RESULT_SUCCESSFULLY',
      { record, numberDoc: number }
    );
  } catch (error) {
    return handleError(error);
  }
};
