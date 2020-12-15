import app from '../app';

before((done) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('=========================================================');
    console.log(`Server is running at http://localhost:${port}`);
    done();
  });
});
