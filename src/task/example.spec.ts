
function addNumbers(a, b){
    return a + b;
}

describe("test", ()=>{
    it("isTrue", ()=>{
        expect(true).toEqual(true)
    });

    it("equal four", ()=>{
        expect(addNumbers(2,2)).toEqual(4)
    })
})