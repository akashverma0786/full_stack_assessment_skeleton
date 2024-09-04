import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slices';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EditUserModal from '../components/EditUserModal';

const fetchHomesByUser = async (userId) => {
  const response = await axios.get(`/homes/find-by-user/${userId}`);
  console.log('API Response:', response.data);
  return response.data;
};

const HomesPage = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Uncomment line 22, 23 for pagination
  // const [currentPage, setCurrentPage] = useState(1); // Current page state
  // const homesPerPage = 50; // Number of homes per page

  const { data: homes, isLoading: homesLoading, refetch } = useQuery({
    queryKey: ['homes', selectedUserId],
    queryFn: () => fetchHomesByUser(selectedUserId),
    enabled: !!selectedUserId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHomeId, setSelectedHomeId] = useState(null);
  const [currentUsers, setCurrentUsers] = useState([]);

  // uncomment line 36, 37, 38 for pagination
  // const indexOfLastHome = currentPage * homesPerPage;
  // const indexOfFirstHome = indexOfLastHome - homesPerPage;
  // const currentHomes = homes?.slice(indexOfFirstHome, indexOfLastHome) || [];

  const openEditUserModal = (homeId) => {
    console.log('Opening Edit User Modal with Home ID:', homeId);
    setSelectedHomeId(homeId);
    const home = homes.find((h) => h.home_id === homeId);
    console.log('Selected Home:', home);
    console.log(home.userHomes.forEach(userHome => {
      console.log('User ID:', userHome.user_id);
    }));


    if (home && home.userHomes) {
      if (Array.isArray(home.userHomes)) {
          const userIds = home.userHomes.map((userHome) => {
              if (userHome) {
                  return userHome.user_id;
              } else {
                  console.warn('userHome entry does not have a user object:', userHome);
                  return null;
              }
          }).filter((id) => id !== null); // Remove null values if userHome.user missing
          console.log('Extracted User IDs:', userIds);
          setCurrentUsers(userIds);
      } else {
          console.warn('home.userHomes is not an array:', home.userHomes);
          setCurrentUsers([]);
      }
  } else {
      console.warn('No userHomes found for the selected home.');
      setCurrentUsers([]);
  }

    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    refetch(); // Refetch homes to reflect changes
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // uncomment line 83 - 86 for pagination
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const totalPages = Math.ceil((homes?.length || 0) / homesPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <select
          className="border p-2"
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId || ''}
        >
          <option value="" disabled>
            Select a user
          </option>
          {usersLoading ? (
            <option>Loading...</option>
          ) : (
            users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))
          )}
        </select>
      </div>

      {homesLoading ? (
        <Skeleton count={6} height={150} width={"100%"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {/* change homes to currentHomes for pagination */}
          {homes?.map((home) => (
            <div key={home.home_id} className="border p-4 rounded shadow w-full max-w-sm">
              <h2 className='font-bold' >{home.street_address}</h2>
              <p>State: {home.state_name}</p>
              <p>Zip: {home.zip}</p>
              <p>Sqft: {home.sqft}</p>
              <p>Beds: {home.beds}</p>
              <p>Baths: {home.baths}</p>
              <p>List Price: ${home.list_price}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openEditUserModal(home.home_id)}
              >
                Edit Users
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Uncomment line 136 - 148 for pagination */}
      {/* <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  index + 1 === currentPage ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div> */}
        
      <EditUserModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        homeId={selectedHomeId}
        currentUsers={currentUsers}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default HomesPage;
