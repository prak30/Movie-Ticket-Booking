const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;
console.log(ticketPrice);

//update count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // console.log(selectedSeats);

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  console.log(seatsIndex);

  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

//seat click event
container.addEventListener("click", function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();
