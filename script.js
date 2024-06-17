document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const registerButton = document.getElementById('registerButton');
    const modal = document.getElementById('registrationModal');
    const closeButton = document.getElementById('closeButton');
    const registrationForm = document.getElementById('registrationForm');
    const statusMessage = document.getElementById('statusMessage');
    const modalDownloadButton = document.getElementById('modalDownloadButton');
    const backButton = document.getElementById('backButton');
    const fileList = document.getElementById('fileList');
    const showDownloadButton = document.getElementById('showDownloadButton');
    const downloadSection = document.getElementById('downloadSection');
    const closeDownloadButton = document.getElementById('closeDownloadButton');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const continueDownload = document.getElementById('continueDownload');
    const goBack = document.getElementById('goBack');
    const userDataSection = document.getElementById('userDataSection');
    const closeUserDataButton = document.getElementById('closeUserDataButton');
    const userData = document.getElementById('userData');
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    const downloadDocButton = document.getElementById('downloadDocButton');
    // Dummy files data
    const files = ['file1.pdf', 'file2.docx', 'file3.xlsx'];
    // Populate the file list
    files.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file;
      fileList.appendChild(li);
    });
    // Toggle menu on small screens
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menuIcon');
    let menuOpen = false;
    // Toggle menu function
    menuToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menu.classList.remove('menu-closed');
        menu.classList.add('menu-open');
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      } else {
        menu.classList.remove('menu-open');
        menu.classList.add('menu-closed');
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
      }
    });
    // Close menu when clicking outside
    window.addEventListener('click', (event) => {
      if (menuOpen && !menu.contains(event.target) && event.target !== menuToggle) {
        menu.classList.remove('menu-open');
        menu.classList.add('menu-closed');
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
        menuOpen = false;
      }
    });
    // Show modal on register button click
    registerButton.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
    // Close modal on close button click
    closeButton.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    // Close modal on outside click
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.add('hidden');
      }
    });
    // Form submission handler
    registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registrationForm);
      try {
        const response = await fetch('process_registration.php', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          const result = await response.json();
          statusMessage.textContent = 'Pendaftaran berhasil!';
          statusMessage.classList.remove('hidden');
          modalDownloadButton.classList.remove('hidden');
          backButton.classList.remove('hidden');
          registrationForm.reset();
        } else {
          throw new Error('Pendaftaran gagal.');
        }
      } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.classList.remove('hidden');
        backButton.classList.remove('hidden');
      }
    });
    // Handle back button click
    backButton.addEventListener('click', () => {
      statusMessage.classList.add('hidden');
      modalDownloadButton.classList.add('hidden');
      backButton.classList.add('hidden');
    });
    // Show download section
    showDownloadButton.addEventListener('click', () => {
      uploadedFiles.innerHTML = '';
      files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        uploadedFiles.appendChild(li);
      });
      downloadSection.classList.remove('hidden');
    });
    // Close download section
    closeDownloadButton.addEventListener('click', () => {
      downloadSection.classList.add('hidden');
    });
    // Continue download button click handler
    continueDownload.addEventListener('click', () => {
      alert('Melanjutkan proses unduh...');
      // Implement download logic
    });
    // Go back button click handler
    goBack.addEventListener('click', () => {
      downloadSection.classList.add('hidden');
    });
  
    // Show user data
    showDownloadButton.addEventListener('click', async () => {
      try {
        const response = await fetch('process_registration.php');
        const data = await response.json();
        userData.innerHTML = `
          <p>Nama Lengkap: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Tempat Lahir: ${data.birthplace}</p>
          <p>Tanggal Lahir: ${data.birthdate}</p>
        `;
        userDataSection.classList.remove('hidden');
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    });
  
    // Close user data section
    closeUserDataButton.addEventListener('click', () => {
      userDataSection.classList.add('hidden');
    });
  });
  
  const { spawn } = require('child_process');

const phpServer = spawn('php', ['-S', 'localhost:8000', '-t', '.']);

phpServer.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

phpServer.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

phpServer.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
