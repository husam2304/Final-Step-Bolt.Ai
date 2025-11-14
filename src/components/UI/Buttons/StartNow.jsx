export function StartNow({ Text }) {
  return (
    <button
      className="bg-white text-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)]  hover:text-[var(--text-light)]  rounded-4xl transition-var(--btn-transition) font-[var(--btn-font-family)] transition-[var(--btn-font-size)]  shadow-[var(--btn-shadow)] hover:shadow-[var(--btn-hover-shadow)] cursor-pointer
     "
      style={{
        paddingLeft: "60px",
        paddingRight: "60px",
        fontSize: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {Text}
    </button>
  );
}

export default StartNow;
