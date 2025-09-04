import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Phone } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Building } from "lucide-react";
import { headers } from "next/headers";

async function fetchSchools() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/schools`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch schools:", res.status, res.statusText);
    return [];
  }

  const json = await res.json();
  return json?.data || [];
}

export default async function ShowSchools() {
  const schools = await fetchSchools();

  return (
    <div className="min-h-screen bg-[#fffaf7d4] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Discover Schools
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore educational institutions in your area
          </p>
          <div className="mt-6">
            <Link href="/addSchool">
              <Button className="cursor-pointer">
                <span className="text-xl font-light">+</span>
                Add New School
              </Button>
            </Link>
          </div>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-12">
            <div className=" mx-auto h-24 w-24 text-gray-400 mb-4">
              <Building size={120} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No schools found
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to add a school to our database!
            </p>
            <Button>
              <Link href="/addSchool">Add First School</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{schools.length}</span>{" "}
                school{schools.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {schools.map((school) => {
                if (!school) return null;
                return (
                  <div
                    key={school.id}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
                  >
                    <div className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
                      {school.image ? (
                        <Image
                          src={
                            school.image ||
                            "https://images.unsplash.com/20/cambridge.JPG?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt={school.name || "No name"}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center group-hover:from-neutral-200 group-hover:to-neutral-300 transition-colors duration-300">
                          <div className="text-center">
                            <p className="w-16 h-16 text-neutral-700 mx-auto mb-2">
                              <Building size={70} />
                            </p>
                            <p className="text-neutral-700 font-medium">
                              School Image
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
                        {school.name}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2">
                          <MapPinned className="text-gray-600" width={13} />
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {school.address}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 ">
                          <Building className="text-gray-600" width={13} />
                          <p className="text-sm text-gray-600">{school.city}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {school.contact && (
                            <div className="flex items-center gap-2">
                              <Phone width={13} />
                              <span>{school.contact}</span>
                            </div>
                          )}
                          {school.state && <Badge>{school.state}</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <div className="text-sm text-gray-500">
                {schools.length === 1
                  ? "1 school"
                  : `${schools.length} schools`}{" "}
                displayed
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
