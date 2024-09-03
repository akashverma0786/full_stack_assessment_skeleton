import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
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

  const handleSave = () => {
    // Implement the save logic here (e.g., make an API call)
    onRequestClose();
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
    </Modal>
  );
};

export default EditUserModal;
