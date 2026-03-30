async function getRandomCountry() {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries/population/filter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      limit: 196,
      lt: 2000000000,
      gt: 500000,
      orderBy: "name",
      order: "asc",
    }),
  });

  const data = await response.json();
  console.log(data);
  const countries = data.data;

  const randomIndex = Math.floor(Math.random() * countries.length);
  const randomCountry = countries[randomIndex];

  console.log("You were born in:", randomCountry.country);
  console.log("Country code:", randomCountry.code);
  console.log("Population:", randomCountry.populationCounts);

  return randomCountry;
}

const button = document.querySelector('.birth-button');
button.addEventListener('click', getRandomCountry, { once: true });