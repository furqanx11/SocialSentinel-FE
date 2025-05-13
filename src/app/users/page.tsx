'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import axios from "axios";
import ProtectedLayout from "@/components/ProtectedLayout";

interface User {
  id: string;
  username: string;
  email:string;
}

const UserManagementTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/`); // Replace with correct route if needed
        console.log("User API Response:", res.data);
        setUsers(res.data.data);
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
      <div className="w-full lg:w-[250px]">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="font-bold  whitespace-nowrap">User Name</TableHead>
                <TableHead className="font-bold hidden sm:table-cell whitespace-nowrap">Email</TableHead>
                <TableHead className="font-bold text-center whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
             {users.filter(user => user.username !== 'admin').map((user) => (
                <TableRow key={user.id}>
                  <TableCell className=" whitespace-nowrap">{user.username}</TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap">{user.email}</TableCell>
                  <TableCell className="flex flex-wrap justify-center gap-2 py-2 text-xs sm:text-sm">
                    <Link href={`/users/${user.id}`}>
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

export default UserManagementTable;
