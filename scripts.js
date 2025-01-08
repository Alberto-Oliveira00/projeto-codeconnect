const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-image");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tagQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueremosRemover);
    }
})

const tagsDisponiveis = ["Front-End", "Programação", "Data Science", "Full-Stack", "HTML", "CSS", "JavaScript", "React", "C#"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        })
    }, 1000)
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                const tagNova = document.createElement("li");
                tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg"    class="remove-tag">`
                listaTags.appendChild(tagNova);
                inputTags.value = "";
            } else {
                alert("A tag não foi encontrada.");
            }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag.Verifique o console")
            }
        }
    }
})

async function publicarProjeto(nome, descricao, tags) {
    // Exemplo: enviar dados para uma API
    return new Promise((resolve) => {
        setTimeout(() => resolve("Projeto publicado!"), 1000);
    });
}

// Metodo utilizado anteriomente (Nem tão util)
// const botaoPublicar = document.querySelector(".botao-publicar");

// async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const deuCerto = "Math.random() > 0.5";

//             if (deuCerto) {
//                 resolve("Projeto publicado com sucesso.")
//             } else {
//                 reject("Erro ao publicar o projeto")
//             }
//         }, 2000)
//     })
// }

// document.querySelector('.botao-publicar').addEventListener('click', async (event) => {

document.querySelector('.botao-publicar').addEventListener('click', async (event) => {
    event.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    function validarFormulario(nome, descricao, tags){
        if (!nome || !descricao) {
            throw new Error('Por favor, preencha todos os campos obrigatórios (nome e descrição).');
        }
        if (tags.length === 0) {
            throw new Error('Adicione pelo menos uma tag ao projeto.');
        }
    }

    try {
        validarFormulario(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);

        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Projeto publicado com sucesso!");
    } catch (error){
        console.log("Erro ao publicar o projeto: ", error)
        alert('Erro ao publicar projeto: ' + error.message);
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";

    listaTags.innerHTML = "";
})