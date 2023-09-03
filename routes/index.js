import express from 'express';

// import generalRoutes from '../routes/general.js'
import handleTransaction from '../controllers/handleTransaction.js';
// import blocksRoutes from '../routes/blocks.js';
// import pagesRoutes from '../routes/pages.js';
import authByPassword from '../controllers/login.js';

// import auth from '../controllers/auth.js'

const app = express();

// app.use('/', generalRoutes)
app.post('/login', authByPassword);

// handles all frontend initiated operations
app.post('/saveTransaction', handleTransaction);

// app.use('/blocks', blocksRoutes);
// app.use('/pages', pagesRoutes);

export default app