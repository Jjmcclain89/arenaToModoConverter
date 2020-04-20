const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.get('/', (req, res) => {
    console.log(`User connected. ${req}`)
	res.sendFile('./index.html');
});

// app.listen(port, () => {
//     console.log('Express server listening on port', port)
//   });
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
