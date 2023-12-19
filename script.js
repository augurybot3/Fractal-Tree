const canvas = document.getElementById('fractalTreeCanvas');
const ctx = canvas.getContext('2d');
const angleSlider = document.getElementById('angleSlider');
const scaleSlider = document.getElementById('scaleSlider');
const lengthSlider = document.getElementById('lengthSlider');

function drawBranch(startX, startY, length, angle, width, color) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    if (length < 10) {
        ctx.restore();
        return;
    }

    drawBranch(0, -length, length * scaleSlider.value, angle - angleSlider.value, width * 0.7, color);
    drawBranch(0, -length, length * scaleSlider.value, angle + angleSlider.value, width * 0.7, color);

    ctx.restore();
}

function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBranch(canvas.width / 2, canvas.height, lengthSlider.value, 0, 10, 'brown');
}

angleSlider.addEventListener('input', drawTree);
scaleSlider.addEventListener('input', drawTree);
lengthSlider.addEventListener('input', drawTree);

drawTree(); // Draw the initial tree