import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Generator = () => {
    const Chance = require('chance');

    const [passwordType, setPasswordType] = useState("password");
    const [minNumber, setMinNumber] = useState(1);
    const [minSpecialChar, setMinSpecialChar] = useState(1);
    const [numLength, setNumLength] = useState(5);
    const [includeUpperCase, setIncludeUpperCase] = useState(true);
    const [includeLowerCase, setIncludeLowerCase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
    const [avoidAmbiguousChars, setAvoidAmbiguousChars] = useState(false);
    const [wordLength, setWordLength] = useState(5);
    const [wordSeparator, setWordSeparator] = useState('-');
    const [viewPassword, setViewPassword] = useState('');

    const generatePassword = () => {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const digitChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`}{[]:;?><,./-=';

        let generatedPassword = '';
        let character;
        for(let i = 0; i < minSpecialChar; i++){
            character = specialChars.charAt(Math.floor(Math.random() * 30));
            generatedPassword += character;
        }
        for(let i = 0; i < minNumber; i++){
            character = Math.floor(Math.random() * 10);
            generatedPassword += character;
        }

        let passwordString = '';
        if(includeNumbers){
        passwordString += digitChars;
        if(minNumber === 0){
            character = Math.floor(Math.random() * 10);
            generatedPassword += character;
        }
        }
        if(includeSpecialChars){
        passwordString += specialChars;
        if(minSpecialChar === 0){
            character = specialChars.charAt(Math.floor(Math.random() * 30));
            generatedPassword += character;
        }
        }
        if(includeUpperCase){
        passwordString += uppercaseChars;
        character = uppercaseChars.charAt(Math.floor(Math.random() * 26));
        generatedPassword += character;
        }
        if(includeLowerCase){
        passwordString += lowercaseChars;
        character = lowercaseChars.charAt(Math.floor(Math.random() * 26));
        generatedPassword += character;
        }

        const passStringLen = passwordString.length;
        let genaratedPassLen = generatedPassword.length;
        if(passStringLen === 0){
            setIncludeLowerCase(true);
        }
        while(genaratedPassLen < numLength){
            character = passwordString.charAt(Math.floor(Math.random() * passStringLen));
            generatedPassword += character;
            genaratedPassLen++;
        }

        if (avoidAmbiguousChars) {
        generatedPassword = generatedPassword.replace(/(0O|1l|2Z|5S|8B|O0|l1|Z2|S5|B8)/g, '2k');
        }
        console.log(generatedPassword);
        setNumLength(genaratedPassLen);
        setViewPassword(generatedPassword);
    };

    const generatePhrase = () => {
        const chance = new Chance();
        const generatedPhrase  = chance.sentence({ words: wordLength }).replace(/\s/g, wordSeparator);
        setViewPassword(generatedPhrase);
    }

    const handleRegenerate = () => {
        if(passwordType === "password"){
            generatePassword();
        }
        else if(passwordType === "phrase"){
            generatePhrase();
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(viewPassword);
        toast.success("Password Copied");
    }
    const handleWordLength = (e) => {
        if(e.target.value > 20){
            setWordLength(20);
        }
        else{
            setWordLength(e.target.value);
        }
    }

    useEffect(() => {
        if(passwordType === "password"){
            generatePassword();
        }
        else if(passwordType === "phrase"){
            generatePhrase();
        }
    },[
        passwordType,
        wordSeparator,
        minNumber,
        minSpecialChar,
        includeUpperCase,
        includeLowerCase,
        includeNumbers,
        includeSpecialChars,
        avoidAmbiguousChars,
    ]);
    return (
        <div className="container">
            <h3>Generator</h3>
            <hr className="bg-danger border-1 border-top border-dark" />
            <div className="card text-dark bg-light mb-3">
                <div className="card-body text-center">
                    <p className="card-text">{viewPassword ? viewPassword : ''}</p>
                </div>
            </div>
            <form>
                <div className="row">
                    <div className="col-12 mb-4">
                        <p className="fw-bold">Password type</p>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="passwordRadioId"
                                value="password"
                                checked={passwordType === "password"}
                                onChange={(e)=>setPasswordType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="passwordRadioId">Password</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="phraseRadioId"
                                value="phrase"
                                checked={passwordType === "phrase"}
                                onChange={(e)=>setPasswordType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="phraseRadioId">Passphrase</label>
                        </div>
                    </div>
                    {passwordType === "password" ? (
                        <>
                            <div className="col-sm-12 col-md-4 mb-4">
                                <label htmlFor="inputLength" className="form-label fw-bold">Length</label>
                                <input
                                    id="inputLength"
                                    className="form-control"
                                    type="number"
                                    value={numLength}
                                    onBlur={generatePassword}
                                    onChange={(e)=>setNumLength(e.target.value.slice(0, 2))}
                                />
                            </div>
                            <div className="col-sm-12 col-md-4 mb-4">
                                <label htmlFor="inputNumber" className="form-label fw-bold">Minimum numbers</label>
                                <input
                                    id="inputNumber"
                                    className="form-control"
                                    type="number"
                                    value={minNumber}
                                    onChange={(e)=>setMinNumber(e.target.value.slice(0, 1))}
                                    />
                            </div>
                            <div className="col-sm-12 col-md-4 mb-4">
                                <label htmlFor="inputSpecial" className="form-label fw-bold">Minimum special</label>
                                <input
                                    id="inputSpecial"
                                    className="form-control"
                                    type="number"
                                    value={minSpecialChar}
                                    onChange={(e)=>setMinSpecialChar(e.target.value.slice(0, 1))}
                                    />
                            </div>
                            <div className="col-12 mb-4">
                                <p className="fw-bold">Options</p>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkCapAToZ"
                                        checked={includeUpperCase}
                                        onChange={(e)=>setIncludeUpperCase(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="checkCapAToZ">A-Z</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkSmlaToz"
                                        checked={includeLowerCase}
                                        onChange={(e)=>setIncludeLowerCase(e.target.checked)}
                                        />
                                    <label className="form-check-label" htmlFor="checkSmlaToz">a-z</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkNum"
                                        checked={includeNumbers}
                                        onChange={(e)=>setIncludeNumbers(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="checkNum">0-9</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkSpecial"
                                        checked={includeSpecialChars}
                                        onChange={(e)=>setIncludeSpecialChars(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="checkSpecial">!@#$%^&*</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAvoidAmb"
                                        checked={avoidAmbiguousChars}
                                        onChange={(e)=>setAvoidAmbiguousChars(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="checkAvoidAmb">Avoid ambiguous characters</label>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-sm-12 col-md-4 mb-4">
                                <label htmlFor="inputWordLength" className="form-label fw-bold">Number of Word</label>
                                <input
                                    id="inputWordLength"
                                    className="form-control"
                                    type="number"
                                    value={wordLength}
                                    onBlur={generatePhrase}
                                    onChange={(e)=> handleWordLength(e)}
                                />
                            </div>
                            <div className="col-sm-12 col-md-4 mb-4">
                                <label htmlFor="inputWordSepa" className="form-label fw-bold">Word Separator</label>
                                <input
                                    id="inputWordSepa"
                                    className="form-control"
                                    type="text"
                                    maxLength={1}
                                    value={wordSeparator}
                                    onChange={(e)=>setWordSeparator(e.target.value)}
                                />
                            </div>
                        </>
                    )
                    
                    }
                    <div className="col-12 mb-4">
                        <button type="button" className="btn btn-dark m-1 hover-btn" onClick={handleRegenerate}>Regenerate Password</button>
                        <button type="button" className="btn btn-outline-secondary m-1" onClick={copyToClipboard}>Copy Password</button>
                    </div>
                </div>
            </form>
        </div>
    )
  }
  export default Generator;