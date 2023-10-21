const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragging");

  const files = e.dataTransfer.files;
  fileInput.files = files;
  uploadFiles(files);
});

fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  uploadFiles(files);
});

function uploadFiles(files) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
    });
}
