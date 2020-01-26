// ****************************************
// Set up the endDate To display the busy
// ****************************************
var someDate = new Date();
var numberOfDaysToAdd = 10;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
// ****************************************


// *****************************************
// Function publicCalendar()
// *****************************************
function publicCalendar() {
        gapi.client.calendar.events.list({
          // 'calendarId': 'primary',
          'calendarId':'u82n0vas2g2ahb8u5c5c3d8vu4@group.calendar.google.com',
          'timeMin': (new Date()).toISOString(),
          "timeMax": someDate.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events yep:');
            var time = (new Date()).toISOString();
          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found yoyo.');
          }
        });
      } // Function publicCalendar
// ****************************************

// ****************************************
// Function insert()
// ****************************************
function insert() {
      var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2020-01-28T09:00:00-05:00'
        //   'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2020-01-28T10:00:00-05:00'
        //   'timeZone': 'America/Los_Angeles'
        },
        // 'recurrence': [
        //   'RRULE:FREQ=DAILY;COUNT=2'
        // ],
        'attendees': [
          {'email': 'nicolasmorinpomerleau@gmail.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'u82n0vas2g2ahb8u5c5c3d8vu4@group.calendar.google.com',
        'resource': event
      });
      
      request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
      });

    } // Function insert()
    // ****************************************
