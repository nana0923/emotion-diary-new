import "@components/Button.css";

const Button = ({ text, onClick, buttonType }) => {
  return (
    <button onClick={onClick} className={`Button Button_${buttonType}`}>
      {text}
    </button>
  );
};
export default Button;
