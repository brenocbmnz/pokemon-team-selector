const url = 'https://pokeapi.co/api/v2/pokemon?limit=1118'
const requisicao = fetch(url)
const dataList = document.querySelector('#listaPokemon')

requisicao.then(function(resposta){
    const dado = resposta.json()
    
    dado.then(function(addpokemon){
        for(const pokemon of addpokemon.results){
            const option = document.createElement('option')
            option.textContent = pokemon.name
            option.value = pokemon.url
            dataList.appendChild(option)
            
        }

    })
})