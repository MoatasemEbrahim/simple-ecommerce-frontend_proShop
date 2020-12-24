import React, { FC, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

const Message:FC<MessageProps> = ({ variant = 'info', children }:MessageProps) => (
  <Alert variant={variant}>
    {children}
  </Alert>
);

export default Message;

interface MessageProps {
  variant?:string,
  children: ReactNode
}
