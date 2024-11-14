import React from 'react'

const AdminNavbar = () => {
  return (
    <div>
           {/* navbar */}
           <div className="h-14  bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
          <ul className="flex justify-between items-center mx-8 p-2 ">
            <li className="text-3xl font-bold ">Dashboard</li>
            <input
              type="text"
              placeholder="Search..."
              className=" w-1/2 px-9 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-violet-800"
              onChange={(e) => setSearch(e.target.value)}
            />
            <li className="text-xl text-cyan-300 cursor-pointer">Logout</li>
          </ul>
        </div>
    </div>
  )
}

export default AdminNavbar