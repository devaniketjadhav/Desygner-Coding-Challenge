class TempTracker {
    constructor(){
        this.min = Number.POSITIVE_INFINITY;
        this.max = 0;
        this.avg = 0;
        this.count = 0;
        this.temp = [];
    }

    insertTemperature = (newTemp) => {
        this.count++;
        this.temp.push(newTemp);
        this.maxTemp(newTemp);
        this.minTemp(newTemp);
        this.avgTemp(newTemp);
    }

    maxTemp(newTemp){
        if(this.max < newTemp){
            this.max = newTemp;
        }
    }

    minTemp(newTemp){
        if(this.min > newTemp){
            this.min = newTemp;
        }
    }

    avgTemp(newTemp){
        this.avg = (this.avg*(this.count-1)+newTemp)/this.count;
        console.log(`Max: ${this.max}, Min: ${this.min}, Avg: ${this.avg}`);
    }
}

const updateTemp = new TempTracker();
setInterval(function(){
    var newTemp = 100 * Math.random();
    updateTemp.insertTemperature(newTemp);
},1000)