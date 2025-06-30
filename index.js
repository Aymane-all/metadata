var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

const upload = multer({ dest :"uploads/"});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/fileanalyse",upload.single('image') ,async (res,req)=> {
  try {
    
    if (!req.file) {
      return res.statusCode(400).json({error : 'Error de upload file'});
    }

    res.json({
      name: file.name,
      type: file.mimetype,
      size: file.size,
    })
  } catch (error) {
    console.error('Error',error);
  }
   
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
