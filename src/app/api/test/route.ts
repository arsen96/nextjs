import { NextResponse } from "next/server"
import  connectMongo  from "../../../../lib/dbConnect"
import  APARTMENTS from "../../../../lib/models/Test"
import mongoose from 'mongoose';
export const GET = async (req:Request) => {
    const promise = new Promise<void>((resolve) => {
        setTimeout(async () => {
            await mongoose.connect(process.env.MONGO_URI as any)
            resolve();
        }, 1000);
    })

    await promise
    // try{
    //     
    // }catch(err){
    //     return NextResponse.json(err,{
    //         status:201
    //     })
    // }
    let test = {test:"testttttt"}
    // const result = await APARTMENTS.find();
    return NextResponse.json(test,{
        status:201
    })
}

export const POST = async (req:Request,res:Response) => {
    return new Promise<any>(async (resolve,reject) => {
        try{
            await connectMongo();
        }catch(err){
        }
        const data = await req.json();
        const newData = {
            ...data,
            price:Number(data.price),
            date:new Date()
        }
        try{
            APARTMENTS.create(newData)
                .then(result => {
                    const res =  NextResponse.json({message:"OK",result},{
                        status:201
                    })
                    resolve(res)
                })
        }catch(err){
            const res = NextResponse.json({message:"Error while",err}.err,{
                status:500
            })
            reject()
        }
    })
  
}