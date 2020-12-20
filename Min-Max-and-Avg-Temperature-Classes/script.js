class updateNumbers{
    constructor(){
        this.min = Number.POSITIVE_INFINITY;
        this.max = 0;
        this.avg = 0;
        this.count = 0;
    }

    get getMin(){
        return this.min;
    }

    get getMax(){
        return this.max;
    }

    get getCount(){
        return this.count;
    }

    get getAvg(){
        return this.avg;
    }

    get getSubmit(){
        return this.submit;
    }

    set setMin(min){
        this.min = min;
    }

    set setMax(max){
        this.max = max;
    }

    set setAvg(avg){
        this.avg = avg;
    }

    set setCount(count){
        this.count = count;
    }
}

var update = new updateNumbers();
var submit = document.getElementById('submit');
var reset = document.getElementById('reset');

document.getElementById('input1').addEventListener('keyup', function(e){
    if(e.code === 'Enter'){
        e.preventDefault();
        document.getElementById('submit').click();
    }
});

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

reset.onclick = function(){
    update.setMin = Number.POSITIVE_INFINITY;
    update.setMax = 0;
    update.setAvg = 0;
    update.setCount = 0;
    changingNumbers(0);
}

function notANumber(values){
    var flag = false;
    values.forEach(e => {
        if(isNaN(e)){
            flag = true;
        }
    })
    return flag;
}

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

function updateArray(arr){
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

function changingNumbers(min){
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

function newEntryField(i){
    document.getElementById(`option${i}`).innerHTML = '-';
    document.getElementById(`option${i}`).setAttribute('onClick', `deleteEntryField(${i})`);
    i++;
    document.getElementById('entries').appendChild(newEntry(i));
}

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

function deleteEntryField(i){
    document.getElementById(`entry${i}`).remove();
}
