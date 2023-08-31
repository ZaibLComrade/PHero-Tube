// Initializing Buttons
const allBtn = document.getElementById("all-button");
const musicBtn = document.getElementById("music-button");
const comedyBtn = document.getElementById("comedy-button");
const drawingBtn = document.getElementById("drawing-button");

// Adding active functionality
const btnArr = [allBtn, musicBtn, comedyBtn, drawingBtn];
btnArr.forEach(elem => {
	elem.addEventListener("click", () => {
		// Add active class
		elem.classList.add("active");

		// Remove active class from all other buttons
		btnArr.forEach(inElem => {
			if(inElem !== elem && inElem.classList.contains("active")) {
				inElem.classList.remove("active");
			}
		})
	})
})

// Fetch API
async function fetchCategoryAPI() {
	const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
	const resource = await response.json();
	if(!resource.status) {
		console.log("Error loading api") // Work on it later
	}
	console.log(resource);
}

fetchCategoryAPI()
