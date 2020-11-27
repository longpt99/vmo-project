import app from './src/app';

app.listen(process.env.PORT || 3000, () => {
  console.log('=========================================================');
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
