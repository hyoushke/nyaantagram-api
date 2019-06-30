module.exports = class benchmarkUtils {

    constructor(){
        this._start = process.hrtime();
    }

    get start (){
        return this._start;
    }

    getDuration(){
        const benchmarkNanoSeconds = process.hrtime(this._start);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)

        return benchmarkMiliSecondsPrecise + ' ms';
    }




}

