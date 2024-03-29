import connectMongoDB from "@/libs/mongodb";
import Members  from "@/models/member";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { aid, nama,  listPayment[{date, cost}], totalCost, status } = await request.json();
//   await connectMongoDB();
//   await Topic.create({ aid, nama,  listPayment[{date, cost}], totalCost, status
//    });
//   return NextResponse.json({ message:"Topic Created" }, { status: 201 });
// }

export async function POST(request) {
  const { aid, nama, listPayment, totalCost, status } = await request.json();

  // Extracting date and cost from each listPayment object in the array
  const listPaymentData = listPayment.map(item => ({
    date: item.date,
    cost: item.cost
  }));

  try {
    await connectMongoDB();
    await Members.create({ aid, nama, listPayment: listPaymentData, totalCost, status });
    return NextResponse.json({ message: "Members Created" }, { status: 201 });
  } catch (error) {
    console.error('Failed to create Members:', error);
    return NextResponse.json({ message: "Failed to create Members" }, { status: 500 });
  }
}




export async function GET() {
  await connectMongoDB();
  const members = await Members.find();
  return NextResponse.json({ members })
}