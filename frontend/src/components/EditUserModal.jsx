import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios'; // Import axios for API call
import { fetchUsers } from '../redux/slices';

Modal.setAppElement('#root');

const EditUserModal = ({ isOpen, onRequestClose, homeId, currentUsers }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [selectedUsers, setSelectedUsers] = useState(currentUsers);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSave = async () => {
    try {
      // Make the API call to update the users related to the home
      await axios.patch('http://localhost:3000/homes/update-users', {
        homeId,
        newUserIds: selectedUsers,
      });

      // Refresh the user list or update the state in the frontend
      dispatch(fetchUsers());
      
      onRequestClose(); // Close the modal
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Edit Users for Home</h2>
      <div>
        {users.map((user) => (
          <div key={user.user_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.user_id)}
                onChange={() => handleCheckboxChange(user.user_id)}
              />
              {user.username}
            </label>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={onRequestClose}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default EditUserModal;


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-modal';
// import { fetchUsers } from '../redux/slices';

// Modal.setAppElement('#root');

// const EditUserModal = ({ isOpen, onRequestClose, homeId, currentUsers }) => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.users);
//   const [selectedUsers, setSelectedUsers] = useState(currentUsers);

//   const handleCheckboxChange = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSave = () => {
//     // Implement the save logic here (e.g., make an API call)
//     onRequestClose();
//   };

//   React.useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
//       <h2>Edit Users for Home</h2>
//       <div>
//         {users.map((user) => (
//           <div key={user.user_id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedUsers.includes(user.user_id)}
//                 onChange={() => handleCheckboxChange(user.user_id)}
//               />
//               {user.username}
//             </label>
//           </div>
//         ))}
//       </div>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//     </Modal>
//   );
// };

// export default EditUserModal;
