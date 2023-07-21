const express = require('express')
const connectDB = require('./mongo/mongoose')
const userCtrl = require('./controllers/userCtrl')
const postCtrl = require('./controllers/postCtrl')
const commentsCtrl = require('./controllers/commentsCtrl')
const cors = require('cors')
const bodyParser = require('body-parser');
const { isUserLogged } = require('./middlewares/middlewares')
const app = express()
const port = 3000

connectDB()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signIn', userCtrl.signIn)
app.post('/signUp', userCtrl.signUp)

app.post('/getUser', isUserLogged, userCtrl.getUser)
app.put('/updateUser', isUserLogged, userCtrl.updateUser);

app.post('/createPost', isUserLogged, postCtrl.createPost);
app.get('/getAllPost', isUserLogged, postCtrl.getAllPost);
app.get('/getUserPost', isUserLogged, postCtrl.getUserPost);
app.get('/getPost/:id', isUserLogged, postCtrl.getPostById);
app.put('/editPost/:id', isUserLogged, postCtrl.editPost);
app.delete('/deletePost/:id', isUserLogged, postCtrl.deletePost);

app.post('/createComments/:id', isUserLogged, commentsCtrl.createComments)

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})