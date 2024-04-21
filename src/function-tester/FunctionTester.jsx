import { PreinstalledTests } from "./PreinstalledTests";
import { FunctionComp } from "./FunctionComp";
import { CustomTests } from "./CustomTests";
import './App.css';

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  console.log(fn);
  console.log(input);
  console.log(output);
  console.log(tests);
  return (
    <>
      <FunctionComp test={fn} />
      <PreinstalledTests tests={[...tests]} fn={fn} />
      <CustomTests fn={fn} input={input}/>
      <button
        onClick={() =>
          onFinish({
            givenTests: [],
            testResult: { achieved: 100, all: 100 },
            customTests: [],
          })
        }
      >
        OK
      </button>
    </>
  );
}
