class Weather {

    get locationInputBox(){
        return $('#searchForm input');
    }

    get searchButton(){
        return $('.searchButton');
    }

    get hoursTimeline(){
        return $('div.hours');
    }

    get hours(){
        var hoursA = [];
        this.hoursTimeline.$$('span.hour').map(e => {
            if (e.getText()){      
                    hoursA.push(this.timeConversion(e.getText()));
            }
        });
        return hoursA;
      }

      get parentTempNode(){
          return $('div.temps');
      }

      get currentTemp(){
          return parseInt(this.parentTempNode.$('span.first').$('span').getText().replace(/[^0-9]/g, ''));
      }

      get tempsText(){
            var tempsA = [];
            // remove fahrenheit symbol and convert to integer
            $$('//div[@class="temps"]/span').map(e => {
                tempsA.push(parseInt(e.getText().replace(/[^0-9]/g, '')));
            });
            // sort temps in descending order
            tempsA.sort(function(a, b) {  
            return a > b ? -1 : b > a ? 1 : 0;
         });
        return tempsA;
        }
    
    hoursTimelineVisible(){
        this.hoursTimeline.waitForExist();
    }

    fillLocationInputBox(location){
        this.locationInputBox.setValue(location);
    }

    submitLocation(){
        this.searchButton.click();
    }

    sortTimex(){
        var date = new Date;
        var currentHour = date.getHours(); 
        
        var intHours = [];
        intHours.push(currentHour);
        // convert time string to integers
        this.hours.map(hour => {
            if (hour != 'N'){
                intHours.push(parseInt(hour));
            }
        })

        // sort time in descending order
        intHours.sort(function(a, b) {  
           return a > b ? -1 : b > a ? 1 : 0;
        });

        return intHours;
    }

    timeConversion(x) {
        // convert am/pm to uppercase
        let s = x.toUpperCase();

        let AMPM = s.slice(-2);
        let timeArr = s.slice(0, -2).split(":");
        if (AMPM === "AM" && timeArr[0] === "12") {
            // edge case of 12AM
            timeArr[0] = "00";
        } else if (AMPM === "PM") {
            // everything with PM can just be added with 12
            timeArr[0] = (timeArr[0] % 12) + 12
        }  
        return timeArr.join(":");
    }


}

export default new Weather();