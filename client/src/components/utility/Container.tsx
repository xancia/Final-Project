interface ContainerProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
      <div
        className={`max-w-screen-lg p-4 mx-auto flex w-full h-full ${
          className || ""
        }`}
      >
        {children}
      </div>
    );
  };
  
  export default Container;