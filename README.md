# Auto DiBS

A script for automatically making study room reservations at Geisel or Biomed Library. Built using CasperJS / PhantomJS.

Caveats: must know the room # you want to reserve in advance

## Usage:

The script takes 5 arguments:
- Library card number
- Room number
- Date (Currently only supports the values: 'tomorrow', 'tmr', 'today')
- Time (ex. 10pm, 10:30pm, 10am)
- UCSD email

```Bash
$ casperjs reservoir.js [lib card number] [room_number] [date] [time] [ucsd.edu email]
```

## Further Explorations:
- Wrap the script around a Messenger / [other chat] Bot to easily book rooms
- Book any room available at the specified time


## TODO
- Dealing with invalid arguments
- Add more date support
- Batch booking
  - Monopolizing rooms not allowed on DIBS system unless using different lib-cards
- Book rooms in between class gaps
- Room booking length change to 3 hours
- CRON job
