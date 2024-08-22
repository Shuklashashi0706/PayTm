import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  name: string;
  _id: number;
};

const Users = () => {
  // Replace with backend call
  const [users] = useState<User[]>([
    {
      name: "Hariom",
      _id: 1,
    },
    {
      name: "Hari",
      _id: 2,
    },
  ]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-3 md:p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 md:h-12 md:w-12 bg-gray-200 flex justify-center items-center mr-3 md:mr-4">
          <span className="text-lg md:text-xl font-medium text-gray-700">
            {user.name[0]}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="text-sm md:text-lg font-semibold text-gray-800">
            {user.name}
          </div>
        </div>
      </div>

      <div className="border border-black rounded-lg">
        <Link to="/send">
          <button className="bg-black hover:bg-white hover:text-black transition-colors duration-100 font-bold text-sm md:text-lg lg:text-xl text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
            Send Money
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Users;
