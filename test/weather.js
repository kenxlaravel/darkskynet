import App from '../page-objects/App';
import Weather from '../page-objects/pages/Weather';
import chai from 'chai';
var assert = chai.assert; 

describe('test weather forcast page', () => {

    it('go to dark sky page', () => {
        App.openDarkSkyNet();
    });

    it('input with zipcode 10001 to location', () => {
        Weather.fillLocationInputBox('10001');
    });

    it('click search button', () => {
        Weather.submitLocation();
    });

    it('verify weather forcast temperature timeline increment by 2 hours for next 24 hrs', () => {
        Weather.hoursTimelineVisible();
        let hours = Weather.sortTimex();
      
        for(var i=1; i<hours.length-1; i++){
             assert.equal(hours[i]-hours[i+1], 2, 'timeline ');
         }
    });

    it('verify current temperature is not lower than forcast lowest temperature', () => {
        let currentTemp = Weather.currentTemp;
        let temps = Weather.tempsText;
        let lengthTemp = temps.length;
        let lowestTemp = temps[lengthTemp-1];
       
        assert.isAtLeast(currentTemp, lowestTemp, 'current temp is not less than timeline lowest temp');
      
    })

    it('verify current temperature is not greater than forcast highest temperature', () => {
        let currentTemp = Weather.currentTemp;
        let temps = Weather.tempsText;
        let highestTemp = temps[0];
        
        assert.isBelow(currentTemp, highestTemp, 'current temp is not greater than timeline highest temp');

    })

});