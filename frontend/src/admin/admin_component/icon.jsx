import React from 'react';

const IconProps = {
  size: 20,
  stroke: 'currentColor',
};

const ChevronDown = ({
  size = IconProps.size,
  stroke = IconProps.stroke,
  ...rest
}) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="side-navigation-panel-select-option-icon side-navigation-panel-select-option-icon-chevron-down"
        {...rest}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </>
  );
};

export const ChevronDownIcon = React.memo(ChevronDown);

const ChevronUp = ({
  size = IconProps.size,
  stroke = IconProps.stroke,
  ...rest
}) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="side-navigation-panel-select-option-icon side-navigation-panel-select-option-icon-chevron-up"
        {...rest}
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </>
  );
};

export const ChevronUpIcon = React.memo(ChevronUp);
