import "../css/Boton.css"


export function BotonClear(props) {
   return (
      <button className={props.className} onClick={()=> props.onClick()}>
         {props.children}
      </button>
   );
}
