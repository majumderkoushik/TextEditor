import React, { useReducer, useRef, useEffect } from "react";

const initialState = {
  text: "",
  preview: ""
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload, preview: action.payload };
    case 'UPPERCASE':
      return { ...state, text: state.text.toUpperCase(), preview: state.text.toUpperCase() };
    case 'LOWERCASE':
      return { ...state, text: state.text.toLowerCase(), preview: state.text.toLowerCase() };
    case 'CLEAR_TEXT':
      return { ...state, text: "", preview: "" };
      case 'COPY_TO_CLIPBOARD':
        const copyToClipboard = async () => {
          try {
            await navigator.clipboard.writeText(action.payload);
            console.log('Text copied to clipboard');
          } catch (err) {
            console.error('Unable to copy text to clipboard', err);
          }
        };
      
        copyToClipboard();
        return state;
    case 'REMOVE_EXTRA_SPACES':
      const newText = state.text.replace(/\s+/g, ' ').trim();
      return { ...state, text: newText, preview: newText };
    default:
      return state;
  }
};

export default function Form(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const textareaRef = useRef(null);
  const wordCountRef = useRef(null);
  const charCountRef = useRef(null);
  const readingTimeRef = useRef(null);

  useEffect(() => {
   
    const words = state.text.split(/\s+/).filter((word) => word !== "").length;
    const characters = state.text.length;
    const readingTime = Math.ceil(words / 200);

    wordCountRef.current.textContent = `Words: ${words}`;
    charCountRef.current.textContent = `Characters: ${characters}`;
    readingTimeRef.current.textContent = `Reading Time: ${readingTime} min`;
  }, [state.text]);

  return (
    <>
     <div>
  <h1 className="text-4xl font-bold mb-4">{props.heading}</h1>
  <div className="mb-3 mt-4">
    <label htmlFor="exampleFormControlTextarea1" className="block text-sm font-medium text-gray-700"></label>
    <textarea
      ref={textareaRef}
      className="form-input mt-1 block w-full border bg-yellow-300 rounded-md shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
      value={state.text}
      onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
      id="myBox"
      rows="8"
    ></textarea>
  </div>
  <div className="flex justify-between w-full">
    <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300" onClick={() => dispatch({ type: 'UPPERCASE' })}>Convert to UpperCase</button>
    <button className="bg-gradient-to-r from-gray-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300" onClick={() => dispatch({ type: 'LOWERCASE' })}>Convert to LowerCase</button>
    <button className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300" onClick={() => dispatch({ type: 'CLEAR_TEXT' })}>Clear Text</button>
    <button className="bg-gradient-to-r from-yellow-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300" onClick={() => dispatch({ type: 'COPY_TO_CLIPBOARD' })}>Copy to Clipboard</button>
    <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300" onClick={() => dispatch({ type: 'REMOVE_EXTRA_SPACES' })}>Remove Extra Spaces</button>
  </div>
</div>

<div className="p-6 rounded-md shadow-lg w-56 items-center">
  <p ref={wordCountRef} className="text-sm text-gray-500"></p>
  <p ref={charCountRef} className="text-sm text-gray-500"></p>
  <p ref={readingTimeRef} className="text-sm text-gray-500"></p>
</div>

<br />

<div className="p-6 rounded-md shadow-lg">
  <strong className="text-lg font-semibold">Preview :</strong>
  <p className="font-semibold text-2xl">{state.preview}</p>
</div>


    </>
  );
}