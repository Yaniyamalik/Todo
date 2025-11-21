import { connectDB } from "@/lib/db";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";

//update todo
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await req.json();

    const updated = await Todo.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(err) },
      { status: 500 }
    );
  }
}

//Delete todo
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Todo deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(err) },
      { status: 500 }
    );
  }
}

//Get todo
export async function GET(req:NextRequest,{ params }: { params: Promise<{ id: string }>}){
  try {
    connectDB();
  const {id }=await params;
  const todo= await Todo.findById(id);
  return NextResponse.json({message:"Todo Fetched successfully",success:true,data:todo},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error Fetching Todo",success:false,error},{status:500})
  }
}