import * as fs from 'fs';
import * as path from 'path';

function buscaBinariaPalavra(caminhoPalavras: string, caminhoIndice: string, palavraBusca: string): {posicaoByte: number, linha: number, iteracoes: number} | null {
    const palavras = fs.readFileSync(caminhoPalavras, 'utf-8').split('\n').map(p => p.trim());
    const indices = fs.readFileSync(caminhoIndice, 'utf-8').split('\n').map(Number);

    let esquerda = 0;
    let direita = indices.length - 1;
    let contadorIteracoes = 0; 

    console.log(`Buscando a palavra: ${palavraBusca}`);

    while (esquerda <= direita) {
        contadorIteracoes++; 
        const meio = Math.floor((esquerda + direita) / 2);
        const posicaoByte = indices[meio];
        const palavraAtual = palavras[Math.floor(posicaoByte / 404)];

        if (palavraAtual === palavraBusca) {
            const linha = Math.floor(posicaoByte / 404) + 1;
            return { posicaoByte, linha, iteracoes: contadorIteracoes };
        } else if (palavraAtual < palavraBusca) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }

    return null;
}

const caminhoPalavras = path.join(__dirname, 'newPalavras.txt');
const caminhoIndice = path.join(__dirname, 'newIndice.txt');

const palavras = fs.readFileSync(caminhoPalavras, 'utf-8').split('\n');
const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];

console.log('');
console.log('Palavra escolhida para busca:', palavraAleatoria);
console.log('');

const resultado = buscaBinariaPalavra(caminhoPalavras, caminhoIndice, palavraAleatoria);

if (resultado !== null) {
    console.log(``);
    console.log(`Palavra encontrada na posição de byte: ${resultado.posicaoByte}`);
    console.log(`Linha: ${resultado.linha}`);
    console.log(`Número de iterações: ${resultado.iteracoes}`);
    console.log(``);
} else {
    console.log('Palavra não encontrada.');
}


// Suponha um array de 7 palavras:
// [0] "vivian"    - posição 0
// [1] "beatriz"   - posição 1
// [2] "jose"   - posição 2
// [3] "maria"    - posição 3  <- meio
// [4] "ana"    - posição 4
// [5] "carlos"   - posição 5
// [6] "joao"    - posição 6

// Buscando "carlos":
// 1. meio = 3 ("maria")
// 2. "carlos" > "maria", então esquerda = 4
// 3. novo meio = 5 ("carlos")
// 4. Palavra encontrada!