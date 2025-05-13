'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import axios from "axios";
import ProtectedLayout from "@/components/ProtectedLayout";

interface User {
  _id: string;
  username: string;
  warnings: number;
}

const WarningUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/more_than_three_warnings`);
        console.log("User warning Response:", res.data);
        setUsers(res.data.data.warnings);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ProtectedLayout>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
      
          <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Users</h2>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="font-bold ">User Name</TableHead>
                  <TableHead className="font-bold text-center">Warnings</TableHead>
                  <TableHead className="font-bold text-center ">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="">{user.username}</TableCell>
                    <TableCell className=" text-center">{user.warnings}</TableCell>
                    <TableCell className="flex justify-center gap-2 py-2">
                      <Link href={`/warninguser/${user._id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600 px-3 py-1">
                          View Report
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default WarningUser;
