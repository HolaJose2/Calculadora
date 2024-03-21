import { useState } from "react";
import "./App.css";
import { Boton } from "./Components/Boton";
import { BotonClear } from "./Components/BotonClear";
import { Resultado } from "./Components/Resultado";
import reactLogo from "./assets/react.svg";
import { evaluate } from "mathjs";

function App() {
   const [resultado, setResultado] = useState("");
   const [seCalculo, setSeCalculo] = useState(false); // Variable de estado para rastrear si se ejecutó calcularResultado
   const operadores = ["+", "-", "*", "/", "."];
   const errores = {
      Error: "Syntax Error",
      Infinity: Infinity,
      Nan: NaN,
   };

   const contieneErrores = (resultado, errores) => {
      return Object.values(errores).includes(resultado);
   };
   const esOperadorRepetido = (val) => {
      return (
         val == resultado[resultado.length - 1] &&
         operadores.includes(resultado[resultado.length - 1])
      );
   };

   const handleResult = (val) => {
      if (val.length > 12) {
         val = val.substring(0, 12);
      }
      setResultado(val);
   };

   const borrarCaracter = () => {
      handleResult(resultado.toString().slice(0, -1));
   };

   const actualizarResultado = (val) => {
      let nuevoResultado = "";

      if (seCalculo && !operadores.includes(val)) {
         nuevoResultado = val;
      } else if (contieneErrores(resultado, errores)) {
         nuevoResultado = val;
      } else if (esOperadorRepetido(val)) {
         return;
      } else {
         nuevoResultado = resultado + val;
      }
      handleResult(nuevoResultado);
      setSeCalculo(false);
   };

   const calcularResultado = () => {
      try {
         if (resultado) {
            if (operadores.includes(resultado[resultado.length - 1])) {
               return;
            }
            if (/[+\-*\/]/.test(resultado) && /[0-9]/.test(resultado)) {
               const resultadoCalculado = evaluate(resultado);
               const resultadoRedondeado =
                  parseFloat(resultadoCalculado).toFixed(10);
               const resultadoLimitado = resultadoRedondeado.substring(0, 12);

               handleResult(evaluate(resultadoLimitado));
               setSeCalculo(true);
            }
         } else {
            alert("Por favor ingrese valores para realizar los calculos");
         }
      } catch (error) {
         handleResult(errores.Error);
         setSeCalculo(true);
      }
   };

   return (
      <div className="App">
         <div className="title">
            <h1>Calculator</h1>
            <img src={reactLogo} alt="Logo - React" />
         </div>
         <div className="contenedor-calculadora">
            <Resultado>{resultado}</Resultado>
            <div className="fila">
               <Boton onClick={actualizarResultado}>7</Boton>
               <Boton onClick={actualizarResultado}>8</Boton>
               <Boton onClick={actualizarResultado}>9</Boton>
               <Boton onClick={actualizarResultado}>/</Boton>
            </div>
            <div className="fila">
               <Boton onClick={actualizarResultado}>4</Boton>
               <Boton onClick={actualizarResultado}>5</Boton>
               <Boton onClick={actualizarResultado}>6</Boton>
               <Boton onClick={actualizarResultado}>*</Boton>
            </div>
            <div className="fila">
               <Boton onClick={actualizarResultado}>1</Boton>
               <Boton onClick={actualizarResultado}>2</Boton>
               <Boton onClick={actualizarResultado}>3</Boton>
               <Boton onClick={actualizarResultado}>-</Boton>
            </div>
            <div className="fila">
               <Boton onClick={calcularResultado}>=</Boton>
               <Boton onClick={actualizarResultado}>0</Boton>
               <Boton onClick={actualizarResultado}>.</Boton>
               <Boton onClick={actualizarResultado}>+</Boton>
            </div>
            <div className="fila">
               <BotonClear
                  onClick={() => handleResult("")}
                  className="boton boton-clear"
               >
                  Clear
               </BotonClear>
               <BotonClear
                  onClick={borrarCaracter}
                  className="boton boton-delete"
               >
                  Del
               </BotonClear>
            </div>
         </div>
      </div>
   );
}

export default App;
