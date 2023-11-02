console.log("hello from app.js");
window.addEventListener('load', ()=>{


    // open and connect socket
    let socket = io();
    //listen for conformation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    document.getElementById('gallery-tracker').addEventListener('click', () => {

    });

////////////////////////
    document.getElementById('button-submit').addEventListener('click', () => {
        const numInput = 5;
        const inputArray = [];
    
        for (let i = 1; i <= numInput; i++) {
            inputArray.push(document.getElementById('input' + i));
        }
    
        // Check if any of the inputs are empty
        const anyEmpty = inputArray.some(input => input.value.trim() === '');
    
        if (anyEmpty) {
            // Display an error message or prevent submission
            console.log('Please fill in all inputs before submitting.');
        } else {
            // All inputs are filled, proceed with submission
            const inputValues = inputArray.map(input => input.value);
            console.log(inputValues); // This will display the array of input values in the console
        }
        let noResponse = inputArray;


        //creating the object
        let obj = {"response" : noResponse};

        //strigify the object
        let jsonData = JSON.stringify(obj);

        // fetch to route noResponse
        fetch('/noResponse', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })

        .then(response => response.json())
        .then(data => {console.log(data)});

        //1. make a fetch request of type POST so that we can sent the (noResponse) info to the server

    })

    document.getElementById('get-tracker').addEventListener('click', () => {
        //get info on all the responses we've had so far
        fetch('/getResponse')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('display-info').innerHTML = '';
            console.log(data);
            for(let i=0; i<data.data.length; i++) {
                let string = data.data[i].response;
                let elt =  document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('display-info').appendChild(elt);
            }
        })

    })
})
