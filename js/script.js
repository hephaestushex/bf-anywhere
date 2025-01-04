const bfarray = [];

let sizeOfArray = parseInt(Math.floor(parseFloat(document.getElementById("sizeOfArray"))));
let cellMaxValue = parseInt(Math.floor(parseFloat(document.getElementById("cellMaxValue"))));

function addValue(value,MaxValue){
    if (value == MaxValue){
        value == 0;
    }

    else{
        value++;
    }

    return value;
}

function subtractValue(value, MaxValue){
    if (value == 0){
        value = MaxValue;
    }

    else{
        value--;
    }
}

function movePointer(dir, currentPointer){
    if (dir === "<"){
        currentPointer--;
    }

    else if (dir === ">"){
        currentPointer++;

    }

    return currentPointer;
}

function jumpConditional(currentCommandPointer, command){
    while(command.charAt(currentCommandPointer) != "["){
        currentCommandPointer--;
    }
    return currentCommandPointer;
}

document.getElementById("myForm").addEventListener("keydown", function (event) {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if needed
      const inputId = event.target.id; // Get the id of the input field
      console.log("Enter pressed in:", inputId);
    }
  });