// Funktion för att slumpa namn
function getRandomNames(names, numNames) {
  let shuffled = names.slice(); // Kopiera listan för att inte förändra originalet
  shuffled.sort(() => Math.random() - 0.5); // Blanda listan
  return shuffled.slice(0, numNames); // Returnera ett urval av slumpade namn
}

// Eventlyssnare för när knappen trycks
document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    // Hämta användarens namn och antal namn att slumpa
    const nameInput = document.getElementById("nameInput").value.trim();
    const numNames = parseInt(document.getElementById("numNames").value, 10);

    // Kontrollera om namnlistan är tom
    if (!nameInput) {
      alert("Vänligen skriv in minst ett namn.");
      return;
    }

    // Dela upp namnsträngen i en array
    const names = nameInput
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    // Kontrollera att vi har tillräckligt med namn
    if (names.length < numNames) {
      alert("Det finns inte tillräckligt med namn i listan.");
      return;
    }

    // Slumpa namnen
    const randomNames = getRandomNames(names, numNames);

    // Visa resultatet
    const randomNamesList = document.getElementById("randomNamesList");
    randomNamesList.innerHTML = ""; // Rensa tidigare resultat

    randomNames.forEach((name) => {
      const listItem = document.createElement("li");
      listItem.textContent = name;
      randomNamesList.appendChild(listItem);
    });
  });
