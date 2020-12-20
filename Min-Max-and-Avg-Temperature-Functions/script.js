var min=Number.POSITIVE_INFINITY, max=0, avg=0, count=0;

function change(){
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

function reset(){
    min=Number.POSITIVE_INFINITY;
    max=0;
    avg=0;
    count=0;
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
    console.time("time");
    arr.sort(function(a,b){return a-b});
    if(min > arr[0]){
        min = arr[0];
    }
    if(max < arr[arr.length - 1]){
        max = arr[arr.length - 1];
    }
    var sum = 0;
    arr.forEach(e => {
        sum += e;
    });
    avg = ((avg * count) + sum) / (count + arr.length);
    count += arr.length;
    changingNumbers(min);
    console.timeEnd("time");
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
        document.getElementById('maxval').innerHTML = max.toFixed(2);
        document.getElementById('avgval').innerHTML = avg.toFixed(2);
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