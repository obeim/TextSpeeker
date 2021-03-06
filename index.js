const express =require('express');
const app =express();
const path=require('path');
const Gtts = require('gtts');
const fs=require('fs')

app.use(express.static('voices'))
app.get('/', function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  if(!fs.existsSync(path.join(__dirname,'/voices'))){
    fs.mkdirSync(path.join(__dirname,'/voices'));

}
 if(fs.existsSync(path.join(__dirname,'/voices','speach.mp3'))){
    fs.unlink(path.join(__dirname,'/voices','speach.mp3'), (err) => {
        if (err) {
            throw err;
        }
    
    });
 }
  gtts.save(path.join(__dirname,'/voices','speach.mp3'),(err,result)=>{
      if(err){
          res.send('fail to convert to audio')
          console.log(err)
      }else{
          res.sendFile(path.join(__dirname,'/voices','speach.mp3'));
       
      }
     
  })

});
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listing on port 300');
})