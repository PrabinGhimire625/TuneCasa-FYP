// import { useState } from "react";
// import { LineChart, BarChart, PieChart } from "recharts";

// function Card({ children, className }) {
//   return <div className={`bg-gray-800 p-4 rounded-lg shadow ${className}`}>{children}</div>;
// }

// function CardContent({ children }) {
//   return <div className="p-2">{children}</div>;
// }

// export default function Dashboard() {
//   const [data] = useState({
//     websiteVisitors: 150000,
//     products: [
//       { name: "iPhone 14 Pro Max", stock: 524, price: 1099 },
//       { name: "Apple Watch S8", stock: 320, price: 799 },
//     ],
//     revenue: 240800,
//     tasksCompleted: 257,
//   });

//   return (
//     <div className="grid grid-cols-2 gap-6 bg-black text-white p-6">
//       {/* Website Visitors */}
//       <Card className="p-4">
//         <CardContent>
//           <h2 className="text-lg font-semibold">Website Visitors</h2>
//           <p className="text-3xl font-bold">{data.websiteVisitors.toLocaleString()}</p>
//         </CardContent>
//       </Card>
      
//       {/* Revenue */}
//       <Card className="p-4">
//         <CardContent>
//           <h2 className="text-lg font-semibold">Revenue</h2>
//           <p className="text-3xl font-bold">${data.revenue.toLocaleString()}</p>
//         </CardContent>
//       </Card>

//       {/* Product List */}
//       <Card className="col-span-2 p-4">
//         <CardContent>
//           <h2 className="text-lg font-semibold">Products</h2>
//           {data.products.map((product, index) => (
//             <div key={index} className="flex justify-between mt-2">
//               <span>{product.name} - {product.stock} in stock</span>
//               <span>${product.price}</span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Tasks Completed */}
//       <Card className="p-4">
//         <CardContent>
//           <h2 className="text-lg font-semibold">Tasks Completed</h2>
//           <p className="text-3xl font-bold">{data.tasksCompleted}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
