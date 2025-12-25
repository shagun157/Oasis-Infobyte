const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Button click input
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.key;

    if (btn.id === "clear") {
      display.value = "";
    } 
    else if (btn.id === "equals") {
      calculate();
    } 
    else if (value) {
      display.value += value;
    }
  });
});

// Keyboard input (NO DUPLICATE)
document.addEventListener("keydown", e => {
  if (/[0-9+\-*/.]/.test(e.key)) {
    display.value += e.key;
  }
  else if (e.key === "Enter") {
    calculate();
  }
  else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}
