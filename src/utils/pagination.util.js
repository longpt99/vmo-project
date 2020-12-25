export default (page, limit) => {
  const pageNum = parseInt(page) < 1 || !page ? 0 : parseInt(page) - 1;
  const perPage = parseInt(limit);
  const startIndex = pageNum * perPage;
  return {
    startIndex: startIndex || 0,
    perPage: perPage || 10,
  };
};
