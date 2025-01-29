const shellHistory = [];

function showShellOutput(shellHistoryArray){
    let finalShellOutput = "";
    for (let i=0; i<shellHistoryArray.length; i++){
        finalShellOutput += shellHistoryArray[i]; 
        finalShellOutput += "<br>"
    }
    return finalShellOutput
}

function addValue(currentPointer, maxVal, array){
    if (array[currentPointer] == maxVal){
        array[currentPointer] = 0;
    }

    else{
        array[currentPointer]++;
    }
}
function subtractValue(currentPointer, maxVal, array){
    if (array[currentPointer] == 0){
        array[currentPointer] = maxVal;
    }

    else{
        array[currentPointer]--;
    }
}



function movePointer(dir, currentPointer, maxTapeLength){
    
    if (dir === "<"){
        if (currentPointer == 0){
            currentPointer = maxTapeLength;
        }

        else{
            currentPointer--;
        }
    }

    else if (dir === ">"){
        if (currentPointer == maxTapeLength){
            currentPointer = 0;
        }

        else{
            currentPointer++;
        }
    }

    return currentPointer;
}

function jumpConditional(jcPairs, commandPointer, pointer, tape){
    if (tape[pointer] != 0){
        commandPointer = jcPairs[commandPointer];
    }
    return commandPointer;
}

async function inputASCII(pointer, tape){
    const shellInput = document.getElementById('shellInput');
    shellInput.value = "";
    const shellInputText = document.getElementById('inputText');
    shellInputText.innerHTML = "<b>Please enter a character now: </b>"

    return new Promise((resolve) => {
        shellInput.addEventListener('keypress', function handler(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                
                const input = shellInput.value;
                tape[pointer] = input.charCodeAt(0) || 0; 
                shellInputText.innerHTML = "Shell Input:";
                shellInput.value = ""; 

                
                shellInput.removeEventListener('keypress', handler);
                resolve();
            }
        });
    });
}

function outputASCII(pointer, tape){
    output = String.fromCharCode(tape[pointer]);
    return output;
}

function parseJumpChars(program){
    let unpairedJumpChars = [];
    let jumpPairs = {};
    for (let i = 0; i < program.length; i++) {
        let char = program[i];

        if (char === "[") {
            
            unpairedJumpChars.push(i);
        } else if (char === "]") {
            
            if (unpairedJumpChars.length > 0) {
                let startIndex = unpairedJumpChars.pop();
                
                jumpPairs[startIndex] = i;
                jumpPairs[i] = startIndex;
            } else {
                alert(`Unmatched closing bracket at position ${i}`);
            }
        }
    }

    // Check if there are unmatched opening brackets
    if (unpairedJumpChars.length > 0) {
        alert(`Unmatched opening bracket at position ${unpairedJumpChars.pop()}`);
    }

    return jumpPairs;
}  


async function run(command){
    let output = "";
    const tape = [];
    let pointer = 0;
    const sizeOfArray = parseInt(Math.floor(parseFloat(document.getElementById("sizeOfArray").value))) || 100;
    document.getElementById("sizeOfArray").value = sizeOfArray;
    const MaxValue = parseInt(Math.floor(parseFloat(document.getElementById("cellMaxValue").value))) || 127;
    document.getElementById("cellMaxValue").value = MaxValue;

    
    for (let i=0; i<sizeOfArray; i++){
        tape[i] = 0;
    }
    
    console.log(tape);

    jumpPairs = parseJumpChars(command);
    console.log(jumpPairs);

    for (let instruction = 0; instruction <= command.length; instruction++){
        switch (command.charAt(instruction)){
            case  ">":
                console.log("Moving pointer");
                console.log("Old pointer ", pointer);
                pointer = movePointer(">", pointer, sizeOfArray);
                console.log("New Pointer ", pointer);
                //console.log("move right")
                break;
            case  "<":
                console.log("Moving pointer");
                console.log("Old pointer ", pointer);
                pointer = movePointer("<", pointer, sizeOfArray);
                console.log("New Pointer ", pointer);
                //console.log("move left")
                break;
            case  "+":
                console.log("Changing tape val")
                console.log("Old value at ", pointer, " is ", tape[pointer])
                addValue(pointer, MaxValue, tape);
                console.log("New value at ", pointer, " is ", tape[pointer])
                //console.log("add one")
                break;
            case  "-":
                console.log("Changing tape val")
                console.log("Old value at ", pointer, " is ", tape[pointer])
                subtractValue(pointer, MaxValue, tape);
                console.log("New value at ", pointer, " is ", tape[pointer])
                //console.log('subtract one')
                break;
            case  "[":
                break;
            case  "]":
                console.log("Moving Command pointer");
                console.log("Old Command pointer ", pointer);
               
                
                instruction = jumpConditional(jumpPairs, instruction, pointer, tape);
                console.log("New Command Pointer ", pointer);
                break;
            case  ".":
                
                output += outputASCII(pointer, tape);
                console.log("Outputing character: ", outputASCII(pointer, tape))
                break;
            case  ",":
                await inputASCII(pointer, tape);
                break;

        }
    }
    shellHistory.push(output);
    document.getElementById("shellOutput").innerHTML = showShellOutput(shellHistory);
    console.log(output);
    programRunning = false;
}



const shell = document.getElementById('shell');
let program = "";
programRunning = false;
shell.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !programRunning) {
        event.preventDefault();
        console.log("Command entered:", shell.value)
        program = shell.value
        programRunning == true;
        run(program);
    }
});
const helpButton = document.getElementById("helpButton");
const helpText = document.getElementById("helpText");
let showHelp = false;
function toggleHelp(){
    console.log("help request");
    
    
    console.log("event registered")
    showHelp = !showHelp;
    if (showHelp) {
        helpButton.innerHTML = "Hide Help";
        helpText.style.display = "block";
        console.log("shown")
    }

    else{
        helpButton.innerHTML = "Show Help";
        helpText.style.display = "none";
        console.log("hidden");
    }
}

document.getElementById("helpButton").addEventListener("click", toggleHelp);
/*
const helpButton = document.getElementById("helpButton");
const helpText = document.getElementById("helpText");
let showHelp = false;
helpButton.addEventListener('click', function () {
    console.log("event registered")
    showHelp = !showHelp;
    if (showHelp) {
        helpButton.innerHTML = "Hide Help";
        helpText.style.display = "block";
        console.log("shown")
    }

    else{
        helpButton.innerHTML = "Show Help";
        helpText.style.display = "none";
        console.log("hidden");
    }
})*/
