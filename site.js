const currentYear = String(new Date().getFullYear());
for (const yearElement of document.querySelectorAll(".current-year")) {
  yearElement.textContent = currentYear;
}
