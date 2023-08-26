const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const resultDisplay = document.getElementById("result-section");
const sound = document.getElementById("sound");
const searchBox = document.getElementById("input-word");

searchBox.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		search();
	}
});

function search() {
	let input = document.getElementById("input-word").value;
	if (input == "") {
		input = "nothing";
	}
	fetch(`${url}${input}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			resultDisplay.innerHTML = `
            <div>
					<div>
						<h2 class="featured-word" data-word>${input.toLowerCase()}</h2>
                  <span class="phonetic">${
							data[0].meanings[0].partOfSpeech || ""
						}</span>
                  <span class="phonetic">${
							data[0].phonetic || data[0].phonetics[0].text || ""
						}</span>
					</div>
					<div class="speaker" id="speakerBtn" onclick="playSound()">
						<i class="fa-solid fa-volume-high"></i>
					</div>
				</div>
				<p class="result">${data[0].meanings[0].definitions[0].definition}</p>
				<p class="example">${data[0].meanings[0].definitions[0].example || ""}</p>
            `;

			sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
			const speakerBtn = document.getElementById("speakerBtn");
			if (sound.getAttribute("src") == "") {
				speakerBtn.style.display = "none";
			}
			console.log(sound);
		})
		.catch((res) => {
			resultDisplay.innerHTML = `<h3 class="error">No Definitions Found</h3>`;
			console.log(res);
		});
}

function playSound() {
	sound.play();
}
