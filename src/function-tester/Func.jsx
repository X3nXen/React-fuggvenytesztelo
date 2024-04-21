//készíts egy függvényt, ami visszaadja a FunctionTester komponensnek az fn paraméterében kapott függvényt egy stringként, ez pedig legyen egy divben

function testComponent({fn}) {
    return (
        <div>
            {fn.toString()}
        </div>
    )
}

export default testComponent;