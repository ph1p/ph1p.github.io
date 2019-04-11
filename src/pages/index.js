import React from 'react';
import styled, { keyframes } from 'styled-components';

const largeCircleDiameter = 45;
const largeCircleDiameterTiny = (63 / 100) * largeCircleDiameter;

const tinyCircleDiameter = (53 / 100) * largeCircleDiameter;

const smallDot = keyframes`
  0% {
    transform: translateY(${largeCircleDiameter + 1}px);
  }
  50% {
    transform: translate(5px, ${largeCircleDiameter + 1}px);
    width: 7px;
    height: 7px;
  }
  100% {
    transform: translate(5px, 5px);
    width: 7px;
    height: 7px;
  }
`;

const largeDot = keyframes`
  from {
    background-color: #000;
  }
  to {
    background-color: transparent;
    border: 1px solid #000;
    width: 19px;
    height: 19px;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  pointer-events: none;
  width: ${largeCircleDiameter - 1}px;
  cursor: none;
  opacity: 0;
  .large-dot,
  .small-dot {
    transition: all 0.3s;
    left: 0;
    background-color: #000;
    border-radius: 100%;
  }
  .large-dot {
    animation: ${largeDot} 0.5s 1.5s cubic-bezier(0.6, 0.04, 0.98, 0.335)
      forwards;
    width: ${largeCircleDiameter}px;
    height: ${largeCircleDiameter}px;
    position: relative;
  }
  .small-dot {
    animation: ${smallDot} 1s 1s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards;
    transform: translateY(${largeCircleDiameter + 2}px);
    width: ${tinyCircleDiameter}px;
    height: ${tinyCircleDiameter}px;
    top: ${largeCircleDiameter + 1}px;
  }
`;

class Logo extends React.PureComponent {
  state = {
    x: 0,
    y: 0,
    animate: false,
    style: {
      opacity: 0,
      width: 20
    }
  };

  handleMouseMove = event => {
    if (this.state.animate) {
      this.setState(state => ({
        x: event.clientX,
        y: event.clientY,
        style: {
          ...state.style,
          transition: null,
          width: 30,
          transform: `translate(${event.clientX - 7}px, ${event.clientY - 7}px)`
        }
      }));
    } else {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  componentDidMount() {
    this.setState(state => ({
      x: window.innerWidth / 2,
      y: (window.innerHeight + 10) / 2,
      style: {
        ...state.style,
        opacity: 1,
        transform: `translate(${(window.innerWidth - this.state.style.width) /
          2}px, ${window.innerHeight / 2}px)`
      }
    }));
    setTimeout(() => {
      this.setState(state => ({
        animate: true,
        style: {
          ...state.style,
          width: 19,
          transition: `transform 0.3s`,
          transform: `translate(${this.state.x - 9}px, ${this.state.y - 4}px)`
        }
      }));
    }, 2000);

    window.addEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { className } = this.props;

    return (
      <LogoWrapper className={className} style={this.state.style}>
        <div className="large-dot">
          <div className="small-dot" />
        </div>
      </LogoWrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #f6f6f6;
  cursor: none;
  height: 100vh;
  .logo {
  }
`;

export default props => {
  return (
    <Wrapper>
      <Logo className="logo" />
    </Wrapper>
  );
};
