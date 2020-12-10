import { getSearchResult } from '../services/search.service';

export { getSearch };

const getSearch = async (req, res) => {
  try {
    const response = await getSearchResult(req.query);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
