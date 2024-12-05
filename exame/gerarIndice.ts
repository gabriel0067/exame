import * as fs from 'fs';
import * as path from 'path';

// Função para gerar o índice de palavras
function gerarIndiceOrdenado(caminhoPalavras: string, caminhoIndice: string) {
    const palavras = fs.readFileSync(caminhoPalavras, 'utf-8').split('\n').map(p => p.trim());

    // Cria uma lista de tuplas (palavra, posição_byte)
    const indices = palavras.map((palavra, idx) => ({
        palavra,
        pos: idx * 404
    }));

    // Ordena as tuplas pela palavra
    indices.sort((a, b) => a.palavra.localeCompare(b.palavra));

    const linhasIndice = indices.map(index => `${index.pos}`).join('\n');
    fs.writeFileSync(caminhoIndice, linhasIndice);

    // Depuração: Log do índice gerado
    console.log("Índice gerado:", indices.slice(0, 10)); // Mostra os primeiros 10 elementos do índice para verificação
}

const caminhoPalavras = path.join(__dirname, 'palavras.txt');
const caminhoIndice = path.join(__dirname, 'indice.txt');

gerarIndiceOrdenado(caminhoPalavras, caminhoIndice);
