const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');  // Caminho para a pasta 'src'
const outputPath = path.join(__dirname, 'arquivos_com_conteudo.txt');  // Arquivo de saída

// Função para listar arquivos e seus conteúdos
function listFilesWithContent(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            listFilesWithContent(filePath, fileList);  // Recursão para subpastas
        } else {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            fileList.push(`### ${filePath} ###\n\n${fileContent}\n\n`);  // Adiciona o nome e o conteúdo do arquivo
        }
    });

    return fileList;
}

const filesWithContent = listFilesWithContent(directoryPath);
fs.writeFileSync(outputPath, filesWithContent.join('\n'), 'utf8');  // Escreve no arquivo de saída
console.log('Arquivos e seus conteúdos exportados com sucesso!');