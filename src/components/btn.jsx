import "./btn.css";

const Btn = ({ texto }) => {
  return (
    <button type="button" className="btn-formulario">
      {texto}
    </button>
  );
};

export default Btn;
