const express = require('express');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');
require('./db/mongoose');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


const port = process.env.PORT | 3000;



app.listen(port, () => {
    console.log(`Server started on ${port}`);
})