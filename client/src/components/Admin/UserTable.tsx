import React, { useState, useEffect } from 'react';
import { userBlock } from '../../features/axios/api/admin';

// Define an interface for the user object
interface User {
  _id: number;
  name: string;
  email: string;
  phone: number;
  status: boolean;
}

const UserTable = ({ users }: { users: User[] }) => {
  // Define local state to track user statuses
  const [userStatuses, setUserStatuses] = useState<{ [userId: number]: boolean }>({});

  useEffect(() => {
    // Initialize user statuses when the component mounts
    const initialUserStatuses = users.reduce(
      (acc, user) => ({ ...acc, [user._id]: user.status }),
      {}
    );
    setUserStatuses(initialUserStatuses);
  }, [users]);

  const onBlockUser = async (userId: number) => {
    try {
      // Send a request to the server to block/unblock the user
      await userBlock(userId);

      // Update the local state to reflect the new status
      setUserStatuses((prevUserStatuses) => ({
        ...prevUserStatuses,
        [userId]: !prevUserStatuses[userId], // Toggle the status
      }));
    } catch (error:any) {
      console.error(error.message);
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Name</th>
          <th className="text-left">Email</th>
          <th className="text-left">Phone</th>
          <th className="text-left">Status</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{userStatuses[user._id] ? "Blocked" : "Active"}</td>
            <td>
              <button
                className={`${
                  userStatuses[user._id]
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                } text-white px-2 py-1 rounded-md`}
                onClick={() => onBlockUser(user._id)}
              >
                {userStatuses[user._id] ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
