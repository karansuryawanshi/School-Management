// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { Phone } from "lucide-react";
// import { MapPinned } from "lucide-react";
// import { Building } from "lucide-react";

// async function fetchSchools() {
//   // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//   const baseUrl = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "http://localhost:3000";

//   const res = await fetch(`${baseUrl}/api/schools`, { cache: "no-store" });

//   if (!res.ok) {
//     console.error("Failed to fetch schools:", res.status, res.statusText);
//     return [];
//   }

//   try {
//     const json = await res.json();
//     return json?.data || [];
//   } catch (err) {
//     console.error("Error parsing JSON:", err);
//     return [];
//   }
// }

// export default async function ShowSchools() {
//   const schools = await fetchSchools();

//   console.log("school.image_____", schools[0].image);

//   return (
//     <div className="min-h-screen bg-[#fffaf7d4] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Discover Schools
//           </h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Explore educational institutions in your area
//           </p>
//           <div className="mt-6">
//             <Link href="/addSchool">
//               <Button className="cursor-pointer">
//                 <span className="text-xl font-light">+</span>
//                 Add New School
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Schools Grid */}
//         {schools.length === 0 ? (
//           <div className="text-center py-12">
//             <div className=" mx-auto h-24 w-24 text-gray-400 mb-4">
//               <Building size={120} />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No schools found
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Be the first to add a school to our database!
//             </p>
//             <Button>
//               <Link href="/addSchool">Add First School</Link>
//             </Button>
//           </div>
//         ) : (
//           <>
//             {/* Results Count */}
//             <div className="mb-6">
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{schools.length}</span>{" "}
//                 school{schools.length !== 1 ? "s" : ""}
//               </p>
//             </div>

//             {/* Schools Grid */}
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {schools.map((school) => {
//                 if (!school) return null;
//                 return (
//                   <div
//                     key={school.id}
//                     className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
//                   >
//                     <div className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
//                       {school.image ? (
//                         <Image
//                           src={
//                             school.image ||
//                             "https://images.unsplash.com/20/cambridge.JPG?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                           }
//                           alt={school.name || "No name"}
//                           width={400}
//                           height={300}
//                           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors duration-300">
//                           <div className="text-center">
//                             <svg
//                               className="w-16 h-16 text-blue-400 mx-auto mb-2"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={1}
//                                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                               />
//                             </svg>
//                             <p className="text-blue-500 font-medium">
//                               School Image
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
//                         {school.name}
//                       </h3>

//                       <div className="space-y-2 mb-4">
//                         <div className="flex items-start gap-2">
//                           <MapPinned className="text-gray-600" width={13} />
//                           <p className="text-sm text-gray-600 line-clamp-2">
//                             {school.address}
//                           </p>
//                         </div>

//                         <div className="flex items-center gap-2 ">
//                           <Building className="text-gray-600" width={13} />
//                           <p className="text-sm text-gray-600">{school.city}</p>
//                         </div>
//                       </div>

//                       <div className="pt-4 border-t border-gray-100">
//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           {school.contact && (
//                             <div className="flex items-center gap-2">
//                               <Phone width={13} />
//                               <span>{school.contact}</span>
//                             </div>
//                           )}
//                           {school.state && <Badge>{school.state}</Badge>}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="text-center mt-12">
//               <div className="text-sm text-gray-500">
//                 {schools.length === 1
//                   ? "1 school"
//                   : `${schools.length} schools`}{" "}
//                 displayed
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

async function fetchSchools() {
  return (
    <div>
      <h1>Hello Buddy</h1>
      <p>This is Updated Page</p>
    </div>
  );
}
