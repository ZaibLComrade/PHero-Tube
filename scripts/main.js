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
