import { useState, useEffect } from "react";

const CountdownTimer = ({ dueTime }: { dueTime: number }) => {
  const calculateTimeLeft = () => {
    const now = Date.now();
    const timeLeft = dueTime - now;

    if (timeLeft <= 0) return "Time is up!";

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [dueTime]);

  return <div className="text-center">{timeLeft}</div>;
};

export default CountdownTimer;
