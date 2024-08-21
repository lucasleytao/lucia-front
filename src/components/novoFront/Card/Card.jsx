import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import styles from "./Card.module.css";
import { LockKeyhole } from 'lucide-react';
import Spinner from 'react-bootstrap/Spinner';

const Card = ({ onClick,bg, key, color, header,functionOnclick, title, children,isDisabled,loading,...props }) => {
  return (
    <BootstrapCard
   onClick={functionOnclick}
        {...props}
      bg={bg}
      key={key}
      text={color}
      style={{ width: '18rem',cursor:isDisabled?"default":"pointer",height:"250px"}}
      className={`mb-2 ${color}`}
    >
      <BootstrapCard.Header style={{width:"100%",textAlign:"center"}}>{header}</BootstrapCard.Header>
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        {loading?<Spinner animation="border" style={{ position: 'absolute', top: '10px', right: '10px'}} />:(isDisabled && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#6c757d' }}>
            <LockKeyhole />
          </div>
        ))}
        
        <BootstrapCard.Text>
          {children}
        </BootstrapCard.Text>
      </BootstrapCard.Body> 
    </BootstrapCard>
  );
}

export default Card;
