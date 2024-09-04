import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios'; //for API call
import { fetchUsers } from '../redux/slices';
import '../home.css';

Modal.setAppElement('#root');

const EditUserModal = ({ isOpen, onRequestClose, homeId, currentUsers, onSave }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [selectedUsers, setSelectedUsers] = useState(currentUsers);

  React.useEffect(() => {
    setSelectedUsers(currentUsers);
  }, [currentUsers]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSave = async () => {
    try {
      // API call to update the users related to the home
      await axios.patch('http://localhost:3000/homes/update-users', {
        homeId,
        newUserIds: selectedUsers,
      });

      // Refresh the user list
      dispatch(fetchUsers());

      onSave();
      
      // Close the modal
      onRequestClose();
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); 

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-content" overlayClassName="modal-overlay fixed inset-0 z-50" >
      <h2 className='text-black' >Edit Users for Home</h2>
      <div>
        {users.map((user) => (
          <div className='text-black' key={user.user_id}>
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
      <div className="btn">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 "
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
