import "./btn.css";

const Btn = ({ texto, onClick, type = "button" }) => {
  return (
    <button type={type} className="btn-formulario" onClick={onClick}>
      {texto}
    </button>
  );
};

export default Btn;
