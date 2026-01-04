// NAVEGAÇÃO ENTRE TELAS
function irPara(id) {
    document.querySelectorAll('.view').forEach(v => {
        v.style.opacity = '0';
        setTimeout(() => v.classList.add('hidden'), 300);
    });
    setTimeout(() => {
        const target = document.getElementById(id);
        target.classList.remove('hidden');
        setTimeout(() => target.style.opacity = '1', 50);
    }, 350);
}

// --- IMAGENS ---
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('preview-canvas');
const ctx = canvas.getContext('2d');

document.getElementById('drop-zone').onclick = () => fileInput.click();
fileInput.onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById('img-preview-container').classList.remove('hidden');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

function convertImage(format) {
    const link = document.createElement('a');
    link.download = `smartconvert-${Date.now()}.${format.split('/')[1]}`;
    link.href = canvas.toDataURL(format);
    link.click();
}

// --- DADOS E MARKDOWN ---
function jsonToCsv() {
    try {
        const json = JSON.parse(document.getElementById('data-input').value);
        const fields = Object.keys(json[0]);
        const csv = [fields.join(','), ...json.map(row => fields.map(f => `"${row[f]}"`).join(','))].join('\r\n');
        document.getElementById('data-output').value = csv;
    } catch(e) { alert("JSON inválido"); }
}

function htmlToMarkdown() {
    const html = document.getElementById('data-input').value;
    const turndownService = new TurndownService();
    document.getElementById('data-output').value = turndownService.turndown(html);
}

// --- DEV TOOLS (QR CODE & MINIFY) ---
function gerarQR() {
    const text = document.getElementById('qr-input').value;
    const qrContainer = document.getElementById('qr-result');
    if (text) {
        qrContainer.innerHTML = "";
        QRCode.toCanvas(text, { width: 130, margin: 2 }, (err, cv) => {
            if (!err) qrContainer.appendChild(cv);
        });
    }
}

function minifyCode() {
    const input = document.getElementById('code-input').value;
    const minified = input.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '').trim();
    document.getElementById('code-input').value = minified;
    alert("Código comprimido!");
}

// --- UNIDADES ---
function converterDados() {
    const gb = parseFloat(document.getElementById('gb-input').value);
    if (!isNaN(gb)) {
        document.getElementById('res-mb').innerText = (gb * 1024).toLocaleString();
        document.getElementById('res-tb').innerText = (gb / 1024).toFixed(4);
        document.getElementById('res-bt').innerText = (gb * 1024 * 1024 * 1024).toLocaleString();
    }
}