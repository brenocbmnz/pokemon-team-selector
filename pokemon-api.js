const trabalhourl = "https://projeto-final-ppw.herokuapp.com/api/18134"

fetch(trabalhourl).then(resposta => {
    resposta.json().then(lista => {
        lista.forEach(pokemon => {
            inserePokemon(pokemon)
        })
    })
})

function adicionaPokemon() {
    const dataList = document.querySelector('#listaPokemon')
    fetch(dataList.value).then((resposta) => {
        resposta.json().then((dado) => {
            if (dado.types[1] === undefined) {
                console.log(dado.types[0].type)
                var pokemontosave = {
                    name: dado.name,
                    pokemonId: dado.id,
                    weight: dado.weight,
                    type: [dado.types[0].type.name],
                    sprite: dado.sprites.front_default
                }
            }else{
                var pokemontosave = {
                    name: dado.name,
                    pokemonId: dado.id,
                    weight: dado.weight,
                    type: [dado.types[0].type.name, dado.types[1].type.name],
                    sprite: dado.sprites.front_default
                }
            }
            salvapokemon(pokemontosave).then(resposta => {
                resposta.json().then(pokemonReturned => {
                    inserePokemon(pokemonReturned)
                })
            })

        })
    })

}

function salvapokemon(pokemon) {
    const opcoes = {
        method: "POST",
        body: JSON.stringify(pokemon),
        headers: {
            "content-type": "application/json",
        }
    }
    return fetch(trabalhourl, opcoes)
}

function deletaPokemon(id, node) {
    const opcoes = {
        method: "DELETE"
    }
    fetch(trabalhourl + "/" + id, opcoes).then(() => {
        node.remove()
    })
}

function editaPokemon(id, node) {
    const dataList = document.querySelector('#listaPokemon')
    console.log(dataList.value)

    fetch(dataList.value).then((resposta) => {
        resposta.json().then((dado) => {
            if (dado.types[1] === undefined) {
                dado.types[1] = null
                var pokemonToEdit = {
                    name: dado.name,
                    pokemonId: dado.id,
                    weight: dado.weight,
                    type: [dado.types[0].type.name],
                    sprite: dado.sprites.front_default
                }
            }else{
                var pokemonToEdit = {
                    name: dado.name,
                    pokemonId: dado.id,
                    weight: dado.weight,
                    type: [dado.types[0].type.name, dado.types[1].type.name],
                    sprite: dado.sprites.front_default
                }
            }
            const opcoes = {
                method: "PUT",
                body: JSON.stringify(pokemonToEdit),
                headers: {
                    'content-Type': 'application/json'
                }

            }
            fetch(trabalhourl + "/" + id, opcoes).then((resposta) => {
                if (resposta.status == 200) {
                    const p = node.querySelector("p")
                    const div = node.querySelector("div")
                    const img = node.querySelector("img")
                    p.textContent = pokemonToEdit.name
                    img.src = pokemonToEdit.sprite
                    console.log(pokemonToEdit.type[1])
                    if (pokemonToEdit.type[1] === undefined) {
                        div.textContent = pokemonToEdit.type[0]
                    } else {
                        div.textContent = pokemonToEdit.type[0] + "/" + pokemonToEdit.type[1]
                    }
                    console.log(pokemonToEdit.type[0])
                    img.src = pokemonToEdit.sprite

                }

            })
        })
    })

}

function inserePokemon(pokemon) {
    const container = document.querySelector('#container-pokemon')
    if (container.children.length >= 6) {
        alert("Um time só pode ter até 6 pokémons!")
        return
    }
    const li = document.createElement('li')
    li.className = "item-pokemon"
    const p = document.createElement('p')
    p.className = "nome"
    var div = document.createElement('div')
    div.className = "tipo"
    const img = document.createElement('img')
    img.className = "sprite"
    const button = document.createElement('button')
    button.id = 'deletar'
    const putbutton = document.createElement('button')
    putbutton.id = 'editar'
    putbutton.innerText = "Editar"
    putbutton.onclick = () => editaPokemon(pokemon._id, li)
    button.innerText = "Deletar"
    button.onclick = () => deletaPokemon(pokemon._id, li)
    p.innerText = pokemon.name

    if (pokemon.type[1] === undefined) {
        div.innerText = pokemon.type[0]
    }else{
        div.innerText = pokemon.type[0] + '/' + pokemon.type[1]
    }

    img.src = pokemon.sprite
    li.appendChild(p)
    li.appendChild(div)
    li.appendChild(img)
    container.appendChild(li)
    li.appendChild(button)
    li.appendChild(putbutton)
}


// Professor, esta é a função que eu não lembrava de onde tinha saído. Acabou que foi só um lixo no código que esqueci de remover.
// A princípio ela não serve pra nada, já que não é chamada em nenhum momento, nem quebrou nada quando removi, mas vou deixar porque citei ela na apresentação.

// function trocaPokemon() {
//    const dataList = document.querySelector('#listaPokemon')
//    console.log(dataList.value)

//    fetch(dataList.value).then((resposta) => {
//        resposta.json().then((dado) => {
//            console.log(dado)
//            const pokemontosave = {
//                name: dado.name,
//                pokemonId: dado.id,
//                weight: dado.weight,
//                type: [dado.types[0].type.name, dado.types[0].type.name],
//                sprite: dado.sprites.front_default
//            }
//            inserePokemon(pokemontosave)
//        })
//    })

// }