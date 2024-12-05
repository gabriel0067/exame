import * as fs from 'fs';
import * as path from 'path';

// Função para gerar uma palavra aleatória de 100 caracteres
function gerarPalavraAleatoria(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let palavra = '';
    for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        palavra += caracteres[randomIndex];
    }
    return palavra;
}

// Gera 50.000 palavras aleatórias
const palavras: string[] = [];
for (let i = 0; i < 50000; i++) {
    palavras.push(gerarPalavraAleatoria());
}

// Escreve as palavras em ordem aleatória no arquivo newPalavras.txt
const caminhoNewPalavras = path.join(__dirname, 'newPalavras.txt');
fs.writeFileSync(caminhoNewPalavras, palavras.join('\n'));

// Cria um array de índices com as posições em bytes
const indices: number[] = [];
for (let i = 0; i < palavras.length; i++) {
    indices.push(i * 404); // Cada linha ocupa 404 bytes
}

// Ordena as palavras e os índices de acordo com a ordem alfabética das palavras
const palavrasOrdenadas = [...palavras].sort();
const indicesOrdenados = palavrasOrdenadas.map(palavra => {
    const indexOriginal = palavras.indexOf(palavra);
    return indices[indexOriginal];
});

// Escreve os índices ordenados no arquivo newIndice.txt
const caminhoNewIndice = path.join(__dirname, 'newIndice.txt');
fs.writeFileSync(caminhoNewIndice, indicesOrdenados.join('\n'));

console.log('Arquivos newPalavras.txt e newIndice.txt foram gerados com sucesso.');