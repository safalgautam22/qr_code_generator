const input = document.getElementById("text");
const button = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrCode");
const options = document.getElementById("sizes");
const downloadBtn = document.getElementById("downloadBtn");

button.addEventListener("click", generateQR);
options.addEventListener("change", changeQRSize);
downloadBtn.addEventListener("click", downloadQR);

// initially disable download
downloadBtn.disabled = true;

function changeQRSize() {
  const sizes = {
    "100x100": 100,
    "150x150": 150,
    "200x200": 200,
    "300x300": 300,
  };

  const selectedSize = sizes[options.value];
  if (!selectedSize) return;

  qrContainer.style.width = selectedSize + "px";
  qrContainer.style.height = selectedSize + "px";
}

function generateQR() {
  const text = input.value.trim();
  const size = options.value;

  if (size === "Select the size of QR") {
    document.getElementById("message").innerText =
      "Please select a QR size";
    return;
  }

  if (!text) {
    alert("Please enter some text or URL");
    return;
  }

  qrContainer.innerHTML = "";

  const img = document.createElement("img");
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(
    text
  )}`;
  img.alt = "Generated QR Code";

  qrContainer.appendChild(img);
  downloadBtn.disabled = false;
}

function downloadQR() {
  const img = qrContainer.querySelector("img");
  if (!img) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr-code.png";
  link.click();
}
