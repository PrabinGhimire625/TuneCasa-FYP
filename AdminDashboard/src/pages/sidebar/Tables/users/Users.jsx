import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../../../store/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../../../../store/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);


  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    dispatch(fetchAllUser());
  };

  const filterByRole = (role) => users?.filter((user) => user.role === role);

  const generateRoleTable = (filteredUsers, roleName) => (
    <div className="my-7">
      <h2 className="text-3xl font-bold text-white mb-5">{roleName}</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm text-left text-gray-300 ">
          <thead className="text-xs uppercase bg-gray-600 dark:bg-gray-700 text-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3">User Name</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Role</th>
              <th scope="col" className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-white whitespace-nowrap"
                  >
                    {user?.username}
                  </th>
                  <td className="px-4 py-3 text-white">{user?.email}</td>
                  <td className="px-4 py-3 text-white">{user?.role}</td>
                  <td className="px-4 py-3 text-white">
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="text-white hover:text-red-700 transition duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-white">
                  No {roleName.toLowerCase()}s found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="p-3 sm:p-5">
      <div className="mx-auto px-4 lg:px-12">
        <div className="border-3  rounded-lg relative shadow-md sm:rounded-lg overflow-hidden">
          {generateRoleTable(filterByRole("user"), "Users")}
          {generateRoleTable(filterByRole("artist"), "Artists")}
        </div>
      </div>
    </section>
  );
};

export default Users;
