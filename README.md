> This README is for Calendar v1

# Calendar
Calendar v1 (beta) application with basic functionality for switching between months and storing events using LocalStorage developed using vanilla JS.
Link to the github example page - [calendar](https://romam.github.io/Calendar)

## Install
For deployment on local machine
```console
npm install
```

## Usage 
For running on local machine
```console
npm run dev
```

To build for production
```console
npm run prod
```

After running on the local machine you can see a main application screen (`http://localhost:8080/`).
To add an event you can use either main 'ADD' button with some [limitations](#known-issues-and-todos) or 
an active calendar cell, after which you will see just created event. 
To change an existing event click on the event or add an event with the same name.
Months show in a locale lang. You can switch between months or go back to current month via 'TODAY' button.

## Known issues and ToDos
1. Calendar can add events only for selected months and only with specific values for 
fields (without zero prefix and with '/' separator). Months started form zero (0).
Using main 'ADD' button, keep that in mind;
2. Validation functionality and messages for the input fields were not applied;
3. Search functionality wasn't applied;
4. Events storage implemented via LocalStorage - Further implementation to SQL/NoSQL DB usage is encouraged.

## License
[MIT](https://couto.mit-license.org/)