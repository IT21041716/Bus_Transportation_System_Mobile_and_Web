import topup from "../models/topup";

export const newTopup = async(req,res) => {
    try{
         const data = new topup({
            
         })

    }catch(error){
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error:error
        })
    }
}