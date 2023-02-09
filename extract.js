//extract pokemon names pokedex info from pokemondb
//FUCK BULBAPEDIA THIS ACTUALLY FUCKING WORKS

//this goes in the console

//goes up to Galar/gen 9
//source for list: https://pokemondb.net/pokedex/national
list = Array.from(document.getElementsByClassName("ent-name")).map(a => a.href.replace("https://pokemondb.net/pokedex/", ""))




o = {}
errorlist = []
parser = new DOMParser();
let count = 0;


function loadXHR(url, name, glitched = false) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (count < list.length) console.log(list);
    if (xhr.status === 200) {
      count++;
      doc = parser.parseFromString(xhr.responseText, "text/html")
      name = doc.getElementById("main").children[0].textContent
      Array.from(doc.getElementsByClassName("cell-med-text")).forEach(a => {
        entry = a.textContent;
        game = a.parentElement.children[0].textContent;
        pkmn = a.parentElement.parentElement.parentElement.parentElement.previousElementSibling.textContent.replace("Pokédex entries", name);
        if (pkmn !== name) pkmn += ` (${name})`
        if (o[pkmn] === undefined) o[pkmn] = {};
        o[pkmn][game] = entry;
        if (o[pkmn]["source"] === undefined) o[pkmn]["source"] = name
      })
    }
    else {
      errorlist.push(name);
      console.log(name)
    };
  }
  xhr.send();
}


//below is to quick test for entries that didn't scrape right
//Object.keys(o).filter(a=>o[a].length < 2000).map(a=>a + " " + o[a].length)


//list = ["persian"]
list.forEach((species, i) => {
  setTimeout(() => {
    url = "https://pokemondb.net/pokedex/" + species;
    loadXHR(url, species);
    console.log(i);
  }, i * 100)
})

Object.keys(o).length + "/" + list.length
