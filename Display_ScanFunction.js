const qrcode = window.qrcode;

function showSignUp() {
  document.getElementById('sign-up').style.display = 'block';
  document.getElementById('display-qr').style.display = 'none';
  document.getElementById('scan-qr').style.display = 'none';
}

function showQRCode() {
  document.getElementById('display-qr').style.display = 'block';
  document.getElementById('sign-up').style.display = 'none';
  document.getElementById('scan-qr').style.display = 'none';

  // Assume you have the user's email stored somewhere
  const userEmail = "user@example.com";
  const qrCodeValue = `Email: ${userEmail} - Other User Data`; // Replace with actual content
  const generatedQR = new qrcode(document.getElementById('generated-qr'));
  generatedQR.makeCode(qrCodeValue);
}

function showScanQR() {
  document.getElementById('scan-qr').style.display = 'block';
  document.getElementById('sign-up').style.display = 'none';
  document.getElementById('display-qr').style.display = 'none';

  // Start the camera for scanning
  startCamera();
}

function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Implement user registration logic here (would typically be done on the server side)
  alert(`User with email ${email} registered successfully!`);
}

function startCamera() {
  const video = document.getElementById('qr-video');

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      detectQRCode(stream);
    })
    .catch((error) => {
      alert(`Error accessing camera: ${error.message}`);
    });
}

function detectQRCode(stream) {
  const video = document.getElementById('qr-video');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  video.addEventListener('loadeddata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const canvasStream = canvas.captureStream();
    const combinedStream = new MediaStream([...canvasStream.getTracks(), ...stream.getTracks()]);

    const qrCodeScanner = new qrcode(video, canvas, (result) => {
      alert(`Scanned QR Code: ${result}`);
      // Perform actions with the scanned QR code result
    });

    setInterval(() => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      qrCodeScanner.update();
    }, 100);
  });
}
