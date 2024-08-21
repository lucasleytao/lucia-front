import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faEdit } from '@fortawesome/free-solid-svg-icons';


const CardGen = ({ titulo, descricao }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Better handling for descricaoTruncada
  const descricaoTruncada = descricao && descricao.length > 50 ? descricao.substring(0, 47) + '...' : descricao;

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000); 
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
     
      <Card
        className="text-lg"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        title={<span style={{ fontSize: '18px' }}>{titulo}</span>} // Slightly larger text for better readability
        size="small"
      >
        <div className="flex items-center justify-center gap-4">
          <p style={{ fontSize: "16px", color: "gray" }}>{descricaoTruncada}</p>
          <div className='flex gap-2'>
            <button className='flex items-center justify-center' style={{border:"1px solid", width:"12px", height:"12px", borderRadius:"50%", display: "flex"}}>
              <FontAwesomeIcon icon={faX} style={{ fontSize: '12px', color: 'black' }}/>
            </button>
            <button className='flex items-center justify-center' style={{border:"1px solid", width:"12px", height:"12px", borderRadius:"50%", display: "flex"}} onClick={showModal}>
              <FontAwesomeIcon icon={faEdit} style={{ fontSize: '12px', color: 'black' }}/>
            </button>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        open={open}
        title="Edit Item"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <p>Edit your item details here.</p>
      </Modal>
    </div>
  );
};

export default CardGen;
