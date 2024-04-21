import run from "./images/run.png";
import notran from "./images/notran.png";
import failed from "./images/failed.png";
import passed from "./images/passed.png";
import edit from "./images/edit.png";
import deleteIMG from "./images/delete.png";
import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';

export function CustomTestRows({tests, fn}){
    const [TestCases, setTestCases] = useState([]);

    const set = (test, ind) => {
        const result = eval(test.testFn(fn));
        console.log(test.testFn(fn));
        setTestCases(TestCases.map((t, i) => (i === ind ? {...t, state: result ? passed : failed} : t)));
    }

    const setAll = () => {
        setTestCases(TestCases.map((t) => ({...t, state: eval(t.testFn(fn)) ? passed : failed})));
    }

    const deleteTest = (ind) => {
        setTestCases(TestCases.filter((t, i) => (i !== ind)));
    }

    const editTest = (test, ind) => {
        setTestCases(TestCases.map((t, i) => (i === ind ? {...t, name: test} : t)));
    }

    useEffect(() => {
        let tmpTests = tests.map((test) => ({...test, state: notran}))
        setTestCases(tmpTests);
    }, [tests])
    return <>
            {TestCases.map((test, i) => (
                <tr key={i}>
                    <td>
                        <div className="testName">{test.name}</div>
                    </td>
                    <td>
                        <div className="testResult"><img src={test.state}></img></div>
                    </td>
                    <td>
                        <div className="testAction"><button className="pic" onClick={() => set(test, i)}><img src={run}></img></button></div>
                        <div className="testAction"><button className="pic" onClick={() => editTest(test)}><img src={edit}></img></button></div>
                        <div className="testAction"><button className="pic" onClick={() => deleteTest(i)}><img src={deleteIMG}></img></button></div>
                    </td>
                </tr>
            ))}
            <tr>
                <td>
                    <button onClick={() => {setAll()}}>
                        Run All
                    </button>
                </td>
            </tr>
    </>
}