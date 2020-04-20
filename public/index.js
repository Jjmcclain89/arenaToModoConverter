window.onload = () => {
	const arenaUpload = document.getElementById('arenaUpload');

	arenaUpload.addEventListener('change', function () {
		if (!window.FileReader) {
			alert('Your browser is not supported');
		}
		const input = arenaUpload;
		// Create a reader object
		const reader = new FileReader();
		if (input.files.length) {
			var textFile = input.files[0];
			console.log('file read');
			reader.readAsText(textFile);
			reader.addEventListener('load', processFile);
		} else {
			alert('Please upload a file before continuing');
		}
	});

	const arenaTextInput = document.getElementById('arenaTextInput');
    console.log(arenaTextInput)
	arenaTextInput.addEventListener('change', handleArenaTextInputChange);

    const parseButton = document.getElementById('parseButton');
    parseButton.addEventListener('click', handleParseClick);
    
    const downloadLink = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', handleDownloadClick);

    function handleDownloadClick(e){
        console.log('download');
        const outputText = document.getElementById('output-text').value;
        console.log(outputText);
        downloadString(outputText, "txt", "modoDeck.txt")
    }

    function handleParseClick(e){
        parseDecklist(arenaTextInput.value)
    }
    
    function processFile(e) {
		var data = e.target.result;
		parseDecklist(data);
	}

	function handleArenaTextInputChange(e) {
		const data = arenaTextInput.value;
		parseDecklist(data);
	}

	function parseDecklist(data) {
		let lines = data.split(`\n`);
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
        const deckList = newLines.join(`\n`);
		document.getElementById('output-text').innerHTML = deckList
    }

    function downloadString(text, fileType, fileName) {
        var blob = new Blob([text], { type: fileType });
      
        var a = document.createElement('a');
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
      }
};
