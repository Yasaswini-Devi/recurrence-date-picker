type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Button({ onClick, children, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}