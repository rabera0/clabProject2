console.log("hello from app.js");
window.addEventListener('load', ()=>{
    document.getElementById('button-submit').addEventListener('click', () => {
        //assign author
        let author = document.getElementById('input1').value;
        //fill in madlibs
        const numInput = 5;
        const inputArray = [];
        for (let i = 1; i <= numInput; i++) {
            inputArray.push(document.getElementById('input' + i).value);
        }
    
        // Check if any of the inputs are empty
        const anyEmpty = inputArray.some(input => input.trim() === '');
    
        if (anyEmpty) {
            // Display an error message or prevent submission
            console.log('Please fill in all inputs before submitting.');
        } else {
            // All inputs are filled, proceed with submission
            const inputValues = inputArray.map(input => input.value);
            // TODO: display error html here
        }
        let noResponse = inputArray;


        //creating the object
        let obj = {
            "author" : author,
            "response" : noResponse};

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

    //see the response of the individual
    document.getElementById('get-tracker').addEventListener('click', () => {
        //get info on all the responses we've had so far
        fetch('/getResponse')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('display-info').innerHTML = '';
            //TODO: add data into html for individual user here
            
        })
    })

      //gallery: see everyones responses
      document.getElementById('gallery-tracker').addEventListener('click', () => {
        //get info on all the responses we've had so far
        fetch('/getResponse')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('display-info').innerHTML = '';
            //TODO: add data into html for the gallery here
            
        })

    })
})
