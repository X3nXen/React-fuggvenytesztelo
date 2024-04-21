import React, { useEffect, useState } from 'react';
import plus from "./images/add.png";
import { CustomTestRows } from './CustomTestRows';
import './App.css';

export function CustomTests({fn, input}){

    let [tests, setTests] = useState(() => {return new Object([])});

    let [isAddTestWidgetVisible, setAddTestWidgetVisible] = useState(() => {return false});


    //addtestwidget

    const [testName, setTestName] = useState();
    const [testSpec, setTestSpec] = useState();
    const [arguements, setArguements] = useState([]);


    useEffect(() => {
        let tmp = Object.keys(input).map((key) => (
        {name: key, type: input[key], value: ""}
        ))
    setArguements(tmp);
    }, [input]);

        let [errors, setErrors] = useState([]);

        const handleSubmit = (e) => {
            e.preventDefault();
            setErrors(errors = new Array());
            let tmp = new Array();
            if(testName == undefined || testName == "" || testName == null){
                tmp.push("Test name is required");
            }
            if(testSpec == "" || testSpec == null || testSpec == undefined){
                tmp.push("Test specification is required");
            }
            if(arguements.length === 0){
                tmp.push("No argument is given");
            }
            arguements.map((arg) => (
                arg.value === "" ? tmp.push("Argument " + arg.name + " not given") : null
            ))

            setErrors(errors = tmp);

            if(errors.length === 0){
                let argumentPairs = new Object();
                arguements.map((arg) => (
                    argumentPairs[arg.name] = parseInt(arg.value)
                ))
                let argumentPairsString = JSON.stringify(argumentPairs);
                let test = {
                    name: testName,
                    testFn: (fn) => (fn(JSON.parse(argumentPairsString)) + testSpec)
                }
                setTests(tests = [...tests, test]);
                console.log(test.testFn);
                console.log(tests)
            }
        }

    return <>
        <h1>Custom Tests</h1>
        <table>
            <tr>
                <th>
                    Testname
                </th>
                <th>
                    Result
                </th>
                <th>
                    Actions
                </th>
            </tr>
            <CustomTestRows tests={tests} fn={fn}/>
            <tr>
                <td>
                    <button className="pic" onClick = {() => {setAddTestWidgetVisible(!isAddTestWidgetVisible)}}><img src={plus}></img></button>
                </td>
            </tr>
        </table>
        {isAddTestWidgetVisible ? 
            <div className="addTestWidget">
            <form onSubmit={handleSubmit}>
                <label htmlFor="testName">Test name:</label>
                <input type="text" id="testName" name="testName" onChange={(e) => setTestName(e.target.value)}></input>
                <label htmlFor="testSpec">Test specification:</label>
                <input type="text" id="testSpec" name="testSpec" onChange={(e) => setTestSpec(e.target.value)}></input>
                {arguements.map((arg, i) => (
                    <div className="inp" key={i}>
                        <label htmlFor={arg.name}>{arg.name}:</label>
                        <input type={arg.type === "array" || arg.type === "object" ? "text" : arg.type} id={arg.name} name={arg.name} onChange={(e) =>
                             arg.type !== "array" && arg.type !== "object" ? 
                             setArguements(arguements.map((a) => (a.name === arg.name ? {...a, value: e.target.value} : a)))
                            : (arg.type === "array" ?
                               JSON.parse(e.target.value).length === 0 ? setArguements(arguements.map((a) => (a.name === arg.name ? {...a, value: []} : a))) : setArguements(arguements.map((a) => (a.name === arg.name ? {...a, value: JSON.parse(e.target.value)} : a)))
                             : JSON.parse(e.target.value).length === 0 ? setArguements(arguements.map((a) => (a.name === arg.name ? {...a, value: {}} : a))) : setArguements(arguements.map((a) => (a.name === arg.name ? {...a, value: JSON.parse(e.target.value)} : a)))
                               )}></input>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            <ul>
            {
                errors.map((error, i) => (
                    <li key={i}><a href={
                        error === "Test name is required" ? "#testName" :
                        error === "Test specification is required" ? "#testSpec" :
                        error === "No argument is given" ? "#testSpec" :
                        error.includes("Argument") ? "#" + error.split(" ")[1] :
                        null
                    }>{error}</a></li>
                ))
            }
            </ul>
        </div>
        : null}
    </>
}