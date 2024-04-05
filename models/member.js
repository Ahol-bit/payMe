import mongoose, {Schema} from "mongoose";

// export const user = new Schema(
// {  
//   id: String,
//   name: String,
//   email: String,
//   password: String,
// }, 
//   {
//     timeStamps: true
//   }
// );

const memberSchema = new Schema(
{  
  aid: String,
  nama: String,
  totalCost: Number,
  status: String,
  listPayment: [
    {
      date: String,
      cost: Number
    },
  ],
}
);

const Members = mongoose.models.Members || mongoose.model("Members", memberSchema);
export default Members;