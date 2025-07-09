import Dues from "@/app/models/dues";
import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import {URL} from 'url'

export async function GET(req) {
    await connectToDB();
    try{
    const {searchParams} = new URL(req.url);
    
    
    const roll = searchParams.get('roll');
    
    
    const data = await Dues.findOne({roll:roll});
    
    
const duesdata = data.dues
return NextResponse.json(duesdata,{message:"Succesfully got dues"})
    }
    catch(err){
       return NextResponse.json({error:err.message},{status:500})
    }
    
}