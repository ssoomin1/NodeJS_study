const express=require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send('hi');
})

app.listen(3000,()=>{
    console.log('Server Running at localhost...');
})