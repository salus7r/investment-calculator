import React, { FC } from 'react';

interface IDisplayChildProps {
    func: JSX.Element;
    text: string;
}

const DisplayChild: FC<IDisplayChildProps> = (props) => {
  const { func, text } = props;

  return (
    <span>
      {func} <small>{text}</small>
    </span>
  );
};

DisplayChild.defaultProps = {
  func: <p>Missing numeric value</p>,
  text: "No value provided"
};

export default DisplayChild;