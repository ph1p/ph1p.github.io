import React from 'react';
import styled, { keyframes } from 'styled-components';

const smallDot = keyframes`
  0% {
    transform: translateY(31px);
  }
  50% {
    transform: translate(5px, 31px);
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
    width: 19px;
    height: 19px;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  pointer-events: none;
  width: 29px;
  .large-dot,
  .small-dot {
    transition: all 0.3s;
    left: 0;
    background-color: #000;
    border-radius: 100%;
    border: 1px solid #000;
  }
  .large-dot {
    animation: ${largeDot} 0.5s 1.5s cubic-bezier(0.6, 0.04, 0.98, 0.335)
      forwards;
    width: 29px;
    height: 29px;
    position: relative;
  }
  .small-dot {
    animation: ${smallDot} 1s 1s cubic-bezier(0.95, 0.05, 0.795, 0.035) forwards;
    transform: translateY(31px);
    width: 15px;
    height: 15px;
    top: 31px;
  }

  &:hover {
    .large-dot {
      width: 29px;
      height: 29px;
      background-color: transparent;
    }
    .small-dot {
      transform: translate(6px, 6px);
      width: 15px;
      height: 15px;
      top: 31px;
    }
  }
`;

class Logo extends React.PureComponent {
  state = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    animate: false,
    firstMouseMove: true,
    style: {
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
          width: 20,
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
    this.setState({
      style: {
        transition: `transform 0.3s`,
        transform: `translate(${window.innerWidth / 2}px, ${this.state.y -
          7}px)`
      }
    });
    setTimeout(() => {
      this.setState({
        animate: true,
        style: {
          transition: `transform 0.3s`,
          transform: `translate(${this.state.x}px, ${this.state.y-7}px)`
        }
      });
    }, 2000);

    window.addEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { x, y } = this.state;
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
