document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysSinceLastVisit = Math.floor(
      (currentDate - Number.parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastVisit < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayWord = daysSinceLastVisit === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayWord} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentDate.toString());
});
