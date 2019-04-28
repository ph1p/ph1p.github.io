import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CursorStyle = styled.div`
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background-color: #000;
  z-index: 999;
  &:after {
    content: '';
    width: 21px;
    height: 21px;
    position: absolute;
    left: -7px;
    top: -7px;
    border: 1px solid #000;
    border-radius: 100%;
  }
`;

const Cursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const setFromEvent = e =>
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    window.addEventListener('mousemove', setFromEvent);

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, []);

  return (
    <CursorStyle
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  );
};

export default Cursor;
