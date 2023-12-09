const exp=require('express');
const userApp=exp.Router();
const bcryptjs=require('bcryptjs');
const mysql=require('mysql2/promise');
const jsonwebtoken=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')

userApp.use(exp.json())

userApp.post('/sign-up', expressAsyncHandler(async (request, response) => {
  const pool = request.app.get('pool');
  const { name, email, password } = request.body;
  const hashedPassword = await bcryptjs.hash(password, 20);
  try {
    const [result] = await pool.execute('insert into users (name,email,password) values(?,?,?)', [name, email, hashedPassword]);
    response.status(201).send({ id: result.insertId, name , password});
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      response.status(200).send({ message: "Username already exists." });
    } else {
      response.status(500).send({ message: "Internal Server Error" ,reason:err.message});
    }
  }
}));


userApp.post('/login',async(request,response)=>{
    const pool=request.app.get('pool')
    const {name,password}=request.body;
    try{
        const [result]=await pool.execute('select * from users where name=?',[name]);
        if(result.length===0){
            response.status(401).send({message:"Invalid Username"});
            return;
        }
        const userOfDB=result[0];
        const comparePasswords=await bcryptjs.compare(password,userOfDB.password);
        if(comparePasswords===false){
            response.status(401).send({message:"Invalid Password"});
        }else{
            const jwtToken=jsonwebtoken.sign({name:userOfDB.name},"12345",{expiresIn:"5m"});
            response.status(200).send({message:"success",user:userOfDB,token:jwtToken})
        }
    }catch(err){
      console.log(err)
        response.status(500).send({message:"Internal Server Error."})
    }
})




module.exports=userApp