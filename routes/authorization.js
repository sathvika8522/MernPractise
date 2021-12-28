const exp=require('express')
const router=exp.Router()

router.get('/',(req,res)=>
{
    res.send('om namah shivaya :)')
})

module.exports=router