/**
 * Units modules
 */
export let Units = {
    getValueInStandardUnit: function (value, unit) {
        var result = value * this.units_[unit];
        return result.toFixed(this.precision_);
    },
    getStandardUnit: function () {
        // TBD when 'units_' is redesigned
    },

    precision_: 4,
    units_: {
        // 'WEIGHT', kg
        'kg': 1,
        'kgs': 1,
        'kilograms': 1,
        'pounds': 0.453592,
        'lbs': 0.453592,
        // 'LENGTH', cm
        'cm': 1,
        'cms': 1,
        'centimeters': 1,
        'feet': 30.48,
        'ft': 30.48,
        'inches': 2.54,
        '[in_i]': 2.54,
        'meters': 100,
        'ft-inches': 2.54  // converted to inches first ???
    }
};


/**
 * Formula modules
 */
export let Formulas = {
    calculations_: {
        precision_: 2,
        // a sum of score values
        'TOTALSCORE': function (sources) {
            var totalScore = 0;
            for (var i = 0, iLen = sources.length; i < iLen; i++) {
                totalScore += parseFloat(sources[i]);
            }
            return totalScore;
        },
        // BMI = weight (kg) / [height (m)] * 2
        // BMI = weight (lb) / [height (in)] * 2 x 703
        'BMI': function (sources) {
            var ret = '';
            var weightInKg = parseFloat(sources[0]), heightInCm = parseFloat(sources[1]);
            if (weightInKg && weightInKg != '' && heightInCm && heightInCm != '' && heightInCm != '0') {
                ret = weightInKg / Math.pow((heightInCm / 100), 2);
                ret = ret.toFixed(this.precision_);
            }
            return ret;

        },

        // BSA (m2) = SQR RT ( [Height(cm) x Weight(kg) ] / 3600 )
        'BSA': function (sources) {
            var ret = '';
            var weightInKg = parseFloat(sources[0]), heightInCm = parseFloat(sources[1]);
            if (weightInKg && weightInKg != '' && heightInCm && heightInCm != '') {
                ret = Math.sqrt(heightInCm * weightInKg / 3600);
                ret = ret.toFixed(this.precision_);
            }
            return ret;

        }
    }
};
