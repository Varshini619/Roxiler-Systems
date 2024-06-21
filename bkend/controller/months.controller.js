const products=require('../Model/products.model')

async function searchMonth(req,res){
   
    try{
       
    //    console.log( await products.aggregate([
    //         {
    //             $addFields:{
    //                 convertedDate:{$toDate:"$dateOfSale"}

    //             }
    //         },{
    //             $limit:1
    //         }
    //     ]))
    

    if(req.headers.month==0){
    res.json(await products.find().skip(req.headers.page*10).limit(10))
    }
    else{
        res.json(await products.aggregate([
            {
                $addFields:{
                            convertedDate:{$toDate:"$dateOfSale"}
                            }
            },
            {
                $addFields:{
                    month:{$month:"$convertedDate"}

                }
            },
            {
                $match:{"month":+req.headers.month}
            }
            

        ]))
    }



}
//     let filter
   
//     if(req.headers.month==0){
        
//         filter=[{
//             $addFields:{
//                 convertedDate:{$toDate:"$dateOfSale"}
//             }
    
    
//         },
//         {$addFields:{
//             month:{$month:"$convertedDate"}}
//         },
        
//         {
//            $skip:req.headers.page*10 
//         },{
//             $limit:10
//         }]
        
//     }
//     else{
//         console.log(req.headers.month)
//         filter=[{
//             $addFields:{
//                 convertedDate:{$toDate:"$dateOfSale"}
//             }
    
    
//         },
//         {$addFields:{
//             month:{$month:"$convertedDate"}}
//         },
//         {
//             $match:{"month":+req.headers.month}
//         },
        
//         {
//            $skip:req.headers.page*10 
//         },{
//             $limit:10
//         }]
//     }
//    res.json( await products.aggregate(filter)
// )

//         // res.json(await products.find().skip(req.headers.page*10).limit(10))
//     }
    catch(err){
        console.log(err)
        res.json(err)
    }

}
async function selectedMonth(req,res){
    console.log(req.headers.month)
   const selectedMonth= await products.aggregate([
        {
            $addFields:{
                        convertedDate:{$toDate:"$dateOfSale"}
                        }
        },
        {
            $addFields:{
                month:{$month:"$convertedDate"}

            }
        },
        {
            $match:{"month":+req.headers.month}
        }
        

    ])
let totalSale=0
   const soldItems= selectedMonth.reduce((x,product)=>{
            if(product.sold===true){
                totalSale=totalSale+product.price
                return x+1

            }
            return x
    },0)
  
    console.log(totalSale)
    res.json({"sold":soldItems,"notSold":selectedMonth.length-soldItems,"sale":totalSale})

}
// async function selected
module.exports={searchMonth,selectedMonth}
