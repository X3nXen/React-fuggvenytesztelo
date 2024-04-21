import run from "./images/run.png";
import notran from "./images/notran.png";
import failed from "./images/failed.png";
import passed from "./images/passed.png";
import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';

export function PreinstalledTests({tests, fn}){
    const [TestCases, setTestCases] = useState([]);

    const set = (test, ind) => {
        const result = test.testFn(fn);
        setTestCases(TestCases.map((t, i) => (i === ind ? {...t, state: result ? passed : failed} : t)));
    }

    const setAll = () => {
        setTestCases(TestCases.map((t) => ({...t, state: t.testFn(fn) ? passed : failed})));
    }

    useEffect(() => {
        let tmpTests = tests.map((test) => ({...test, state: notran}))
        setTestCases(tmpTests);
    }, [tests])
    return <>
    <h1>Preinstalled Tests</h1>
        <div className="preinstalledTests">
            <table>
                <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                    <th>Action</th>
                    <th>Points</th>
                </tr>
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
                    </td>
                    <td>
                        <div className="testPoints">{test.points}</div>
                    </td>
                </tr>
            ))}
            <tr>
                <td>
                </td>
                <td>
                </td>
                <td>
                    <button onClick={() => {setAll()}}>
                        Run All
                    </button>
                </td>
                <td>
                    <div>Sum: {TestCases.filter(test => test.state == passed).reduce((partialSum, a) =>  partialSum + a.points, 0)}</div>
                </td>
            </tr>
            </table>
        </div>
    </>
}