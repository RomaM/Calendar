> This README is for Calendar v1

# Calendar
The calendar application v1 (beta) with basic functionality using only vanilla JS.
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

## Known issues and ToDo's
1. Calendar can add events only for selected months and only with specific values for 
fields (without zero prefix and with '/' separator). Months started form zero (0).
Using main 'ADD' button, keep that in mind;
2. Validation functionality and messages for the input fields were not applied;
3. Search functionality wasn't applied;
4. Events storage implemented via LocalStorage - Further implementation to SQL/NoSQL DB usage is encouraged.

## License
[MIT](https://couto.mit-license.org/)