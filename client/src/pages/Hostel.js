import React, { useState, useEffect } from 'react';
import { Button, Space, Modal, Card } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const hostelOptions = ['Aravalli', 'Satpura', 'Nilgiri', 'Sahyadri', 'MT-1', 'MT-2', 'Thrishul', 'Vindhya', 'Karavalli', 'MT-3'];

function Hostel() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { user } = useSelector((state) => state.users);

  // Load the selected hostel from localStorage on component mount
  useEffect(() => {
    const storedHostel = localStorage.getItem('selectedHostel');
    if (storedHostel) {
      setSelectedHostel(storedHostel);
    }
  }, []);

  const handleBookNow = async (hostel) => {
    if (selectedHostel === null) {
      try {
        const response = await axios.post('/api/users/update-hostel', {
          userId: user._id, // replace with actual user ID
          hostel,
        });

        if (response.data.success) {
          setSelectedHostel(hostel);
          // Save the selected hostel to localStorage
          localStorage.setItem('selectedHostel', hostel);
        } else {
          // Handle error
          console.error(response.data.message);
        }
      } catch (error) {
        // Handle error
        console.error(error.message);
      }
    } else {
      setIsConfirmationVisible(true);
    }
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      setSelectedHostel(null);
      // Remove the selected hostel from localStorage
      localStorage.removeItem('selectedHostel');
    }
    setIsConfirmationVisible(false);
  };

  return (
    <div style={{ marginBottom: '70px' }}>
      <h1>Hostel Options</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '75px' }}>
        {hostelOptions.map((hostel) => (
          <Card key={hostel} style={{ width: 200, background: '#f0f0f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <span>{hostel}</span>
              <Button
                type={selectedHostel === hostel ? 'primary' : 'default'}
                onClick={() => handleBookNow(hostel)}
                disabled={selectedHostel !== null && selectedHostel !== hostel}
              >
                {selectedHostel === hostel ? 'Booked' : 'Book Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title="Confirmation"
        visible={isConfirmationVisible}
        onOk={() => handleConfirmation(true)}
        onCancel={() => handleConfirmation(false)}
        okText="Yes"
        cancelText="No"
      >
        Are you sure you want to proceed? This will unselect the current hostel.
      </Modal>
    </div>
  );
}

export default Hostel;
