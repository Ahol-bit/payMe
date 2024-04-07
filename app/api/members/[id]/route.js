import connectMongoDB from "@/libs/mongodb";
import Members from "@/models/member";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const listPaymentData = await request.json();
    const { id } = params;

    // Ensure proper connection to MongoDB
    await connectMongoDB();

    // Find the member by ID
    const member = await Members.findById(id);
    
    // Check if member exists
    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    // Push listPaymentData object to the listPayment array
    let total = 0;
    member.listPayment.push(listPaymentData);
    member.listPayment.map((e) => {
      total += e.cost
    })
    member.totalCost = total;

    if (member.totalCost >= 500000) {
      member.status = 'lunas'
    }
    // Save the updated member document
    await member.save();
    
    return NextResponse.json({ message: "Payment Created", total }, { status: 201 });
  } catch (error) {
    console.error('Failed to create payment:', error);
    return NextResponse.json({ message: "Failed to create payment" }, { status: 500 });
  }
}





export async function GET() {
  await connectMongoDB();
  const members = await Members.find();
  return NextResponse.json({ members })
}

// export async function PUT(request, { params }) {
//   try {
//     const listPaymentData = await request.json();
//     const { id } = params;

//     // Ensure proper connection to MongoDB
//     await connectMongoDB();

//     // Find the member by ID
//     const member = await Members.findById(id);
    
//     // Check if member exists
//     if (!member) {
//       return NextResponse.json({ message: "Member not found" }, { status: 404 });
//     }

//     // Check if listPaymentData is not empty
//     // Concatenate listPaymentData with the existing listPayment array
//     member.listPayment = member.listPayment.concat(listPaymentData);
    
//     // Save the updated member document
//     await member.save();
    
//     return NextResponse.json({ message: `Payment Created from ${listPaymentData}` }, { status: 201 });
//   } catch (error) {
//     console.error('Failed to create payment:', error);
//     return NextResponse.json({ message: "Failed to create payment" }, { status: 500 });
//   }
// }