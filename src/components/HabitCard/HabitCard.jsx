import { useState, useEffect } from "react";
import { Link } from "react-router";

const HabitCard = ({ habit }) => {
  const [isDone, setIsDone] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Function to get the time period in milliseconds based on frequency
  const getTimePeriod = (frequency) => {
    switch (frequency) {
      case "Daily":
        return 24 * 60 * 60 * 1000; // 24 hours
      case "Weekly":
        return 7 * 24 * 60 * 60 * 1000; // 7 days
      case "Monthly":
        return 30 * 24 * 60 * 60 * 1000; // 30 days
      default:
        return 24 * 60 * 60 * 1000; // Default to daily
    }
  };

  // Function to check if enough time has passed since last completion
  const canComplete = () => {
    const lastCompletionKey = `habit_${habit._id}_last_completion`;
    const lastCompletion = localStorage.getItem(lastCompletionKey);

    if (!lastCompletion) {
      return true; // Never completed before
    }

    const timePeriod = getTimePeriod(habit.habitFrequency);
    const timeElapsed = Date.now() - parseInt(lastCompletion);

    return timeElapsed >= timePeriod;
  };

  // Check completion status on component mount and set up periodic checks
  useEffect(() => {
    const checkStatus = () => {
      const canCompleteNow = canComplete();
      setIsDisabled(!canCompleteNow);

      // Set isDone based on recent completion
      const lastCompletionKey = `habit_${habit._id}_last_completion`;
      const lastCompletion = localStorage.getItem(lastCompletionKey);

      if (lastCompletion) {
        const timeElapsed = Date.now() - parseInt(lastCompletion);
        const timePeriod = getTimePeriod(habit.habitFrequency);
        setIsDone(timeElapsed < timePeriod);
      } else {
        setIsDone(false);
      }
    };

    checkStatus();

    // Set up interval to check every minute if status should change
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [habit._id, habit.habitFrequency]);

  const handleCheckboxChange = async (e) => {
    e.preventDefault(); // Prevent navigation to habit details
    e.stopPropagation();

    if (isDisabled) {
      return;
    }

    try {
      // Call backend to create a habit log entry
      const response = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/habits/${
          habit._id
        }/logs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Store completion time in localStorage
        const lastCompletionKey = `habit_${habit._id}_last_completion`;
        localStorage.setItem(lastCompletionKey, Date.now().toString());

        setIsDone(true);
        setIsDisabled(true);
      } else {
        console.error("Failed to mark habit as done");
      }
    } catch (error) {
      console.error("Error marking habit as done:", error);
    }
  };

  if (!habit) return null;

  return (
    <Link to={`/habits/${habit._id}`}>
      <article>
        <h2>{habit.habitName}</h2>
        <p>{habit.habitDescription}</p>
        <p>{habit.habitFrequency}</p>
        <p>Started on {habit.createdAt}</p>
        <div>
          <form>
            <input
              type="checkbox"
              name="done"
              id={`marked-done-${habit._id}`}
              checked={isDone}
              disabled={isDisabled}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`marked-done-${habit._id}`}>
              {isDisabled && isDone
                ? `Completed (${
                    habit.habitFrequency === "Daily"
                      ? "next: tomorrow"
                      : habit.habitFrequency === "Weekly"
                      ? "next: next week"
                      : "next: next month"
                  })`
                : "Mark Done"}
            </label>
          </form>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HabitCard;
