const app = require('../app');
const { connect } = require('../config/connection');
const PORT = process.env.PORT || 5000;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
