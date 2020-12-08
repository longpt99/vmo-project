import { getSearchResult } from '../services/search.service';

export { getSearch };

const getSearch = async (req, res) => {
  try {
    const response = await getSearchResult(req.query);
    return res.json(response.status).json(response);
  } catch (error) {
    return res.json(500).json({ error: error.message });
  }
};
