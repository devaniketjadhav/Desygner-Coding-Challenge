class updateNumbers{
    constructor(){
        this.min = Number.POSITIVE_INFINITY;
        this.max = 0;
        this.avg = 0;
        this.count = 0;
    }

    //getter method for min
    get getMin(){
        return this.min;
    }
    //getter method for max
    get getMax(){
        return this.max;
    }
    //getter method for count
    get getCount(){
        return this.count;
    }
    //getter method for avg
    get getAvg(){
        return this.avg;
    }
    //setter method for min
    set setMin(min){
        this.min = min;
    }
    //setter method for max
    set setMax(max){
        this.max = max;
    }
    //setter method for avg
    set setAvg(avg){
        this.avg = avg;
    }
    //setter method for count
    set setCount(count){
        this.count = count;
    }
}

var update = new updateNumbers();
var submit = document.getElementById('submit');
var reset = document.getElementById('reset');

//adding event listeners in input elements for activating submit click on 'Enter' keyup 
document.getElementById('input1').addEventListener('keyup', function(e){
    if(e.code === 'Enter'){
        e.preventDefault();
        document.getElementById('submit').click();
    }
});

//onclick event on submit button, taking array of numbers from input fields and saving into 'values' array
//validating inputs for null values and not a number values before passing to function 'updateArray'
submit.onclick = function(){
    var arr = document.querySelectorAll('input');
    var values = [];
    arr.forEach(e => values.push(parseFloat(e.value)));
    var currentState = document.getElementById('entries');
    while(currentState.firstChild){
        currentState.removeChild(currentState.firstChild);
    }
    currentState.appendChild(newEntry(1));
    if(notANumber(values)){
        window.alert('Please enter valid numbers');
    } else{
        updateArray(values);
    }
}

//reset onclick event to reset min, max, avg and count values
//passing pseudo value of 0 for min whereas it is set to positive infinity
reset.onclick = function(){
    update.setMin = Number.POSITIVE_INFINITY;
    update.setMax = 0;
    update.setAvg = 0;
    update.setCount = 0;
    changingNumbers(0);
}

//validating if a value other than number is supplied as an input
function notANumber(values){
    var flag = false;
    values.forEach(e => {
        if(isNaN(e)){
            flag = true;
        }
    })
    return flag;
}

//function to update min, max, avg and count based on number supplied
/*function updateNumber(num){
    console.time("time");
    count++;
    if(min > num){
        min = num;
    }
    if(max < num){
        max = num;
    }
    avg = (avg*(count-1)+num)/count;
    console.log(`Min : ${min}, Max : ${max}, Avg : ${avg}`);
    console.timeEnd("time");
};*/

//function to update min, max, avg and count based on array of numbers supplied
function updateArray(arr){
    //sorting array in ascending order to get min and max
    arr.sort(function(a,b){return a-b});
    if(update.getMin > arr[0]){
        update.setMin = arr[0];
    }
    if(update.getMax < arr[arr.length - 1]){
        update.setMax = arr[arr.length - 1];
    }
    var sum = 0;
    arr.forEach(e => {
        sum += e;
    });
    update.setAvg = ((update.getAvg * update.getCount) + sum) / (update.getCount + arr.length);
    update.setCount = update.getCount+arr.length;
    changingNumbers(update.getMin);
};

//function to change updated values of min, max and avg in the DOM
function changingNumbers(min){
    //small animation of randomly changing numbers every 30ms before displaying resulted values
    var id = setInterval(() => {
        document.getElementById('minval').innerHTML = (100* Math.random()).toFixed(2);
        document.getElementById('maxval').innerHTML = (100* Math.random()).toFixed(2);
        document.getElementById('avgval').innerHTML = (100* Math.random()).toFixed(2);
    }, 30);
    setTimeout(function(){
        clearInterval(id);
        document.getElementById('minval').innerHTML = min.toFixed(2);
        document.getElementById('maxval').innerHTML = update.getMax.toFixed(2);
        document.getElementById('avgval').innerHTML = update.getAvg.toFixed(2);
    },300);
}

//function to add new entry field, activates on click of + button
function newEntryField(i){
    document.getElementById(`option${i}`).innerHTML = '-';
    document.getElementById(`option${i}`).setAttribute('onClick', `deleteEntryField(${i})`);
    i++;
    document.getElementById('entries').appendChild(newEntry(i));
}

//function returning a DOM element of new input field with + button
function newEntry(i) {
    var newBtn = document.createElement('div');
    newBtn.setAttribute('id', `entry${i}`);
    var input = document.createElement('input');
    input.setAttribute('id', `input${i}`);
    input.setAttribute('placeholder', 'Enter Temperature Value');
    input.setAttribute('type','text');
    input.addEventListener('keyup', function(e){
        if(e.code === 'Enter'){
            e.preventDefault();
            document.getElementById('submit').click();
        }
    });
    var btn = document.createElement('button');
    btn.setAttribute('id', `option${i}`);
    btn.innerHTML = '+';
    btn.setAttribute('onClick', `newEntryField(${i})`);
    newBtn.appendChild(input);
    newBtn.appendChild(btn);
    return newBtn;
}

//function to delete DOM element of input field, activates on click of - button
function deleteEntryField(i){
    document.getElementById(`entry${i}`).remove();
}
