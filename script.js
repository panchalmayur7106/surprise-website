const texts = document.querySelectorAll(".text");
let current = 0;

document.addEventListener("click", () => {
  if (current < texts.length - 1) {
    texts[current].classList.remove("active");
    current++;
    texts[current].classList.add("active");
  }
});
