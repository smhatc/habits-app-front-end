import "./HabitLog.css";

const HabitLog = ({ habit }) => {
  return (
    <>
      <h2 className="habitlog-header">Activity History</h2>
      <article className="habitlog-container">
        {habit.habitLog.map((log) => (
          <div className="habitlog-log" key={log._id}>
            <img
              className="habitlog-checkmark"
              src="/assets/images/checkmark.png"
              alt="Checkmark Icon"
            />
            <p className="habitlog-date">
              Completed on {new Date(log.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </article>
    </>
  );
};

export default HabitLog;
