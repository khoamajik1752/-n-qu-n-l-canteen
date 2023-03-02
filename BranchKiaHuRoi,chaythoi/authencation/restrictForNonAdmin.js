module.exports=(req,res,next)=>{
    try{
        if(!(req.session&&req.session.user) || (req.session&&req.session.role=='user')){
            next()
        }
        else{
            res.redirect('/');
        }
    }
    catch(err){
        console.log(err);
    }
}