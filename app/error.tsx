'use client';
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center" >
      <h1 className="text-4xl font-bold mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-neutral-400">
        We apologize for the inconvenience.
      </p>
    </div>
  );
};

export default ErrorState;
