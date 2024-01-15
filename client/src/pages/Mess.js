import React, { useState, useEffect } from 'react';
import { Button, Space, Modal, Card } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const messOptions = ['block1', 'block2', 'block3', 'block4', 'mega mess', 'block5', 'block7'];

function Mess() {
  const [selectedMess, setSelectedMess] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { user } = useSelector((state) => state.users);


  // Load the selected mess from localStorage on component mount
  useEffect(() => {
    const storedMess = localStorage.getItem('selectedMess');
    if (storedMess) {
      setSelectedMess(storedMess);
    }
  }, []);

  const handleBookNow = async (mess) => {
    if (selectedMess === null) {
      try {
        // Simulate an API request to update the mess on the server
        const response = await axios.post('/api/users/update-mess', {
          userId: user._id,
          mess,
        });

        if (response.data.success) {
          setSelectedMess(mess);
          // Save the selected mess to localStorage
          localStorage.setItem('selectedMess', mess);
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
      setSelectedMess(null);
      // Remove the selected mess from localStorage
      localStorage.removeItem('selectedMess');
    }
    setIsConfirmationVisible(false);
  };

  return (
    <div style={{ marginBottom: '70px' }}>
      <h1>Mess Options</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '75px' }}>
        {messOptions.map((mess) => (
          <Card key={mess} style={{ width: 200, background: '#f0f0f0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <span>{mess}</span>
              <Button
                type={selectedMess === mess ? 'primary' : 'default'}
                onClick={() => handleBookNow(mess)}
                disabled={selectedMess !== null && selectedMess !== mess}
              >
                {selectedMess === mess ? 'Booked' : 'Book Now'}
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
        Are you sure you want to proceed? This will unselect the current mess.
      </Modal>
    </div>
  );
}

export default Mess;
