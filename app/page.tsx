import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mb-4">
          <span className="block text-purple-700">Welcome to the</span>
          <span className="block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 bg-clip-text text-transparent">
            Path of Quantum Learning
          </span>
        </p>
        <Button variant="loginbutton" size="default">
          Login
        </Button>
      </div>
      <div className="flex justify-center mb-6">
        <p className="text-base text-center text-gray-400 max-w-xl">
          <span>“What I cannot create, I do not understand. </span>
          <span>Know how to solve every problem that has been solved.” — Richard Feynman</span>
        </p>
      </div>
    </div>
  );
}
