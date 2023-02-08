import React from 'react'
import { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');

    const handleUpClick = () => {
        // console.log(text);
        if (calculateWords() == 0) {
            props.showAlert("Please enter some text!", "warning")
            return;
        }
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success")

    }
    const handleLoClick = () => {
        if (calculateWords() == 0) {
            props.showAlert("Please enter some text!", "warning")
            return;
        }
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success")

    }
    const handleClear = () => {
        if (calculateWords() == 0) {
            props.showAlert("Please enter some text!", "warning")
            return;
        }
        let flag;
        flag = window.confirm("Did You Want to Clear the text!!");
        if (flag) {
            setText('');
        }
        props.showAlert("Cleared the textarea!", "success");
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to clipboard!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const calculateWords = () => {
        let numOfWords = 0;
        let words = text.split(/\s+/);
        words = words.filter((w) => w.length)
        return words.length;
    };
    return (
        <>
            <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control"
                        style={{ backgroundColor: props.mode === "dark" ? "#223333" : "white", color: props.mode === "dark" ? "white" : "black" }}
                        id="myBox" rows={8} value={text} onChange={handleOnChange} />
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert To Uppercase </button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert To Lowercase </button>
                <button className="btn btn-secondary mx-1 my-1" onClick={handleCopy}>Copy</button>
                <button className="btn btn-danger mx-1 my-1" onClick={handleClear}>Clear</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h2>Your text summary</h2>
                <p> <b>{calculateWords()}</b> words and <b>{text.length}</b> characters</p>
                <p>{0.008 * calculateWords()} Minutes read</p>
                <h2>Preview</h2>
                <p> {text.length > 0 ? text : 'Enter some text in above textbox to preview it here'} </p>
            </div>
        </>
    )
}
