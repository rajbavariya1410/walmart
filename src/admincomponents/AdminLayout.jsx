import React from "react";
import { Outlet } from "react-router-dom";
import AdmineSidebar from "./AdmineSidebar";
import AdmineNavbar from "./AdmineNavbar";

export default function AdminLayout() {
  return (
    <>
      <AdmineSidebar />
      <AdmineNavbar />
      <div className="md:pl-65 min-h-screen">
        <main className="p-4">
          <Outlet /> {/* Nested admin pages render here */}
        </main>
      </div>
    </>
  );
}
