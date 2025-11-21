import { connectDB } from "@/lib/db";
import Todo from "@/models/todo.model";
import { NextRequest,NextResponse } from "next/server"

//Add todo
export async function POST(request:NextRequest){
    try {
        await connectDB();

        const {text} =await request.json();
        const todo= await Todo.create({text})
        return NextResponse.json({success:true,message:"Todo created successfully",data:todo},{status:201})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error creating Todos",error},{status:500})
    }
}


//Get all todos
export async function GET(){
    try {
         await connectDB();
    const todos= await Todo.find().sort({createdAt:-1});
    
    return NextResponse.json({success:true,message:"Todos fetched succcessfully",data:todos},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching Todos", error},{status:500})
    }
    
}
