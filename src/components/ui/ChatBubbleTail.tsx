import React from "react";

// Define the type for the component's props
type ChatBubbleTailProps = {
  /**
   * Additional classes for styling, especially for color (e.g., 'text-blue-500').
   */
  className?: string;
  /**
   * The vertical alignment point in pixels, used to calculate the 'top' position.
   * @default 38.5
   */
  alignmentY?: number;
};

const ChatBubbleTail = ({
  className,
  alignmentY = 38.5,
}: ChatBubbleTailProps) => {
  // The original CSS for `top` is too complex for standard Tailwind classes.
  // The correct way to handle this in React is with the `style` prop.
  const dynamicTopStyle: React.CSSProperties = {
    top: `min(max(${alignmentY}px - 18px, 12px), calc(100% - 32px))`,
  };

  return (
    <svg
      height="20"
      viewBox="0 0 18 20"
      width="18"
      // Combines base classes with any classes passed via props
      className={`absolute -left-4 ${className}`}
      style={dynamicTopStyle}
      aria-hidden="true" // Hide from screen readers as it's decorative
    >
      <path
        d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"
        fill="#131f24"
      />
      <path
        clipRule="evenodd"
        d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChatBubbleTail;
