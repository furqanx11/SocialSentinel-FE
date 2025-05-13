// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
  return (
    
      <div className="hidden md:block   mt-6">
        <div className="h-[75vh] flex flex-col gap-6">
          <div className="h-screen p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <nav className="mt-5">
              <ul className="space-y-3">
                <li><Link href="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">Dashboard</Link></li>
                <hr className="border-t-1 border-gray-50 w-36 self-center" />
                <li><Link href="/warninguser" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">Warned User</Link></li>
                <hr className="border-t-1 border-gray-50 w-36 self-center" />
                <li><Link href="/users" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">Users</Link></li>
                <hr className="border-t-1 border-gray-50 w-36 self-center" />
                <li><Link href="/analytics" className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100">Analytics</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      );
};

      export default Sidebar;
