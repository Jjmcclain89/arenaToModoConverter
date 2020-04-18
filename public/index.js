window.onload = () => {
	const arenaUpload = document.getElementById('arenaUpload');

	arenaUpload.addEventListener('change', function () {
		if (!window.FileReader) {
			alert('Your browser is not supported');
		}
		var input = arenaUpload;
        console.log("!")
		// Create a reader object
		var reader = new FileReader();
		if (input.files.length) {
			var textFile = input.files[0];
			console.log('file read');
			reader.readAsText(textFile);
			reader.addEventListener('load', processFile);
		} else {
			alert('Please upload a file before continuing');
		}
	});

	function processFile(e) {
		var file = e.target.result,
			results;
		let lines = file.split(`\n`);
		lines = lines.map((line) => line.replace(/[\x00-\x1F\x7F-\x9F]/g, ''));
		const newLines = [];

		let currentLineIndex = 0;
		// Find the start of the deck
		while (
			lines[currentLineIndex] != `Deck` &&
			currentLineIndex < lines.length
		) {
			currentLineIndex++;
			if (currentLineIndex == lines.length)
				newLines.push('Invalid Text Format');
		}
		// Move past the 'Deck' line
		currentLineIndex++;

		// Parse remaining lines
		while (currentLineIndex < lines.length) {
			// if(lines[currentLine] == 'Sideboard')
			let line = lines[currentLineIndex].split(`(`);
			currentLineIndex++;
			newLines.push(line[0]);
		}
		document.getElementById('output-text').innerHTML = newLines.join(`\n`);

		console.log(newLines);
	}
};
