import { model } from 'mongoose';
import { handleResponse } from '../helpers/response.helper';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.util';

export { getSearchResult };

const getSearchResult = async (query) => {
  try {
    const {
      orderBy,
      page = 1,
      limit,
      sortBy,
      modelName,
      name,
      filter = '',
      from,
      to,
    } = query;
    const perPage = Number(limit);
    const start = (Number(page) - 1) * perPage;
    const record = await model(capitalizeFirstLetter(modelName))
      .find(
        {
          $or: [
            { name: { $regex: name || '', $options: 'i', $exists: true } },
            {
              name: { $exists: false },
            },
          ],
          createdAt: {
            $gte: from ? new Date(from) : new Date('01/01/1970'),
            $lt: to ? new Date(to).setHours(23, 59, 59) : new Date(),
          },
        },
        filter
      )
      .sort([[sortBy, orderBy]])
      .skip(start)
      .limit(perPage);

    return handleResponse(
      200,
      'Get result successfully',
      'GET_RESULT_SUCCESSFULLY',
      { record, numberDoc: record.length }
    );
  } catch (error) {
    throw error;
  }
};
