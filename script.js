class TempTracker {
    constructor(){
        this.min = Number.POSITIVE_INFINITY;
        this.max = 0;
        this.avg = 0;
        this.count = 0;
        this.temp = [];
    }

    //method to trigger when new temperature is supplied.
    //It will add the temp in array and call methods to update min, max and avg.
    insertTemperature = (newTemp) => {
        this.count++;
        this.temp.push(newTemp);
        this.maxTemp(newTemp);
        this.minTemp(newTemp);
        this.avgTemp(newTemp);
    }

    //method to set max temperature
    maxTemp(newTemp){
        if(this.max < newTemp){
            this.max = newTemp;
        }
    }

    //method to set min temperature
    minTemp(newTemp){
        if(this.min > newTemp){
            this.min = newTemp;
        }
    }

    //method to set new temperature
    avgTemp(newTemp){
        this.avg = (this.avg*(this.count-1)+newTemp)/this.count;
        console.log(`Max: ${this.max}, Min: ${this.min}, Avg: ${this.avg}`);
    }
}

const updateTemp = new TempTracker();

//suppplying new temperature between 0 to 100 to TempTracker class every 1000ms using setInterval.
setInterval(function(){
    var newTemp = 100 * Math.random();
    updateTemp.insertTemperature(newTemp);
},1000)