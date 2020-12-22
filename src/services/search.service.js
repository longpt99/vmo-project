import { model } from 'mongoose';
import { handleResponse } from '../helpers/response.helper';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.util';

export { getSearchResult };

const getSearchResult = async (query) => {
  try {
    const {
      orderBy,
      page,
      limit,
      sortBy,
      modelName,
      name,
      filter,
      from,
      to,
    } = query;

    const pageNum = parseInt(page) < 1 || !page ? 0 : parseInt(page) - 1;
    const perPage = parseInt(limit);
    const start = pageNum * perPage;

    console.log(start, perPage);

    const [record, totalDoc] = await Promise.all([
      model(capitalizeFirstLetter(modelName))
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
        .sort(sortBy && orderBy && [[sortBy, orderBy]])
        .limit(perPage)
        .skip(start),
      model(capitalizeFirstLetter(modelName)).countDocuments(),
    ]);

    return handleResponse(
      200,
      'Get result successfully',
      'GET_RESULT_SUCCESSFULLY',
      { record, totalDoc: from || to ? record.length : totalDoc }
    );
  } catch (error) {
    throw error;
  }
};
