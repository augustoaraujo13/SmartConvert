// NAVEGAÇÃO
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

function convertToBase64() {
    const base64 = canvas.toDataURL();
    navigator.clipboard.writeText(base64);
    alert("Código Base64 copiado para a área de transferência!");
}

// --- DADOS ---
function jsonToCsv() {
    try {
        const json = JSON.parse(document.getElementById('data-input').value);
        const fields = Object.keys(json[0]);
        const csv = [fields.join(','), ...json.map(row => fields.map(f => `"${row[f]}"`).join(','))].join('\r\n');
        document.getElementById('data-output').value = csv;
    } catch(e) { alert("JSON inválido"); }
}

function csvToJson() {
    try {
        const csv = document.getElementById('data-input').value.split('\n');
        const headers = csv[0].split(',');
        const result = csv.slice(1).map(line => {
            const data = line.split(',');
            return headers.reduce((obj, h, i) => { obj[h.trim()] = data[i]?.trim(); return obj; }, {});
        });
        document.getElementById('data-output').value = JSON.stringify(result, null, 2);
    } catch(e) { alert("CSV inválido"); }
}

// --- DEV ---
function hexToRgb() {
    const hex = document.getElementById('hex-in').value;
    if(/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        const r = parseInt(hex.slice(1,3), 16);
        const g = parseInt(hex.slice(3,5), 16);
        const b = parseInt(hex.slice(5,7), 16);
        document.getElementById('rgb-out').innerText = `rgb(${r}, ${g}, ${b})`;
    }
}

function decToBin() {
    const dec = parseInt(document.getElementById('dec-in').value);
    if(!isNaN(dec)) document.getElementById('bin-out').innerText = dec.toString(2);
}