// Initializing Buttons
const allBtn = document.getElementById("all-button");
const musicBtn = document.getElementById("music-button");
const comedyBtn = document.getElementById("comedy-button");
const drawingBtn = document.getElementById("drawing-button");
const btnArr = [allBtn, musicBtn, comedyBtn, drawingBtn];

// Fetch Category API
async function fetchCategoryAPI() {
	const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
	const resource = await response.json();
	if(!resource.status) {
		console.log("Error loading api category") // Work on it later
	}
	data = resource.data;

	// Connecting buttons with category API
	addBtnEvents(data);
}
// Fetch category API on file load
fetchCategoryAPI()

// Fetch Data API
async function fetchDataAPI(id) {
	const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
	const resource = await response.json();
	
	// Error Handling
	const err = document.getElementById("error");
	if(!resource.status) {
		err.classList.remove("hidden");
	} else {
		err.classList.add("hidden");
		// Display cards
	}
	console.log(resource);
}

// Adding button functionality
function activateBtn(id) {
	console.log("id:", id);
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
			// Fetch data API on button click
			fetchDataAPI(id);
		})
	})
}

function addBtnEvents(data) {
	for(let i = 0; i < data.length; i++) {
		btnArr[i].addEventListener("click", () => {
			// Add active class
			btnArr[i].classList.add("active");

			// Remove active class from all other buttons
			btnArr.forEach(inElem => {
				if(inElem !== btnArr[i] && inElem.classList.contains("active")) {
					inElem.classList.remove("active");
				}
			})

			// Fetch data API on button click
			fetchDataAPI(data[i].category_id);
		})	
	}
}

function displayCard(dataObj) {
	
}
