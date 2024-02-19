import "../css/Boton.css"

export function Boton(props) {
   function esOperador(valor) {
      return isNaN(valor) && valor !== "." && valor !== "=";
   }
   return (
      <button
         className={`boton ${
            esOperador(props.children) ? "operador" : ""}`.trim()}
         onClick={()=>props.onClick(props.children)}
      >
         {props.children}
      </button>
   );
}
