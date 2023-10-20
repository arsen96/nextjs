import { NextResponse } from "next/server"
import  connectMongo  from "../../../../../lib/dbConnect"
import  APARTMENTS from "../../../../../lib/models/Test"


export const GET = async (req, res) => {
    // let result = {"test":"test"};
    const id = res.params.id;

    let result;
    try{
        await connectMongo();
    }catch(err){
        return NextResponse.json(err,{
            status:201
        })
    }
    result = await APARTMENTS.find({_id:id});
    return NextResponse.json(result,{
        status:201
    })
}


