import * as fs from 'fs';
import * as path from 'path';

// Função para buscar uma palavra usando busca binária
function buscaBinariaPalavra(caminhoPalavras: string, caminhoIndice: string, palavraBusca: string): number {
    const palavras = fs.readFileSync(caminhoPalavras, 'utf-8').split('\n').map(p => p.trim());
    const indices = fs.readFileSync(caminhoIndice, 'utf-8').split('\n').map(Number);

    let esquerda = 0;
    let direita = indices.length - 1;

    // Depuração: Log da palavra que estamos buscando
    console.log("Buscando a palavra:", palavraBusca);
    
    while (esquerda <= direita) {
        const meio = Math.floor((esquerda + direita) / 2);
        const posicaoByte = indices[meio];

        const palavraAtual = palavras[posicaoByte / 404];

        // Depuração: Log da palavra atual e posição
        console.log("Comparando com:", palavraAtual, "na posição de byte:", posicaoByte);

        if (palavraAtual === palavraBusca) {
            return posicaoByte;  // Retorna a posição em bytes da palavra
        } else if (palavraAtual < palavraBusca) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }
    
    return -1;  // Palavra não encontrada
}

const caminhoPalavras = path.join(__dirname, 'palavras.txt');
const caminhoIndice = path.join(__dirname, 'indice.txt');
const palavraBusca = 'JMbZQZsJM1PXuyCl6ehh3Bfzjk71Dcx72VyXb2tImgxKuuR9GGBeB7pw4GIOTvX2YRXIkXXHVAyQ28nr7pZoMU8FioZfHVmsdTZH';  // Substitua pela palavra que você deseja buscar

const posicaoByte = buscaBinariaPalavra(caminhoPalavras, caminhoIndice, palavraBusca);

if (posicaoByte !== -1) {
    console.log(`Palavra encontrada na posição de byte: ${posicaoByte}`);
} else {
    console.log('Palavra não encontrada.');
}
