const express=require('express');
const app = express();

app.set('views','./views');
app.set('view engine','pug');
app.use(express.urlencoded({extended:true}));

app.listen(4000,()=>{
    console.log("Running Server...");
})