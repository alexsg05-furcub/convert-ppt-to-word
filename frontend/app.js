document.getElementById("convertBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!fileInput.files.length) {
    status.textContent = "Selecciona un archivo PPT o PPTX";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  status.textContent = "Convirtiendo...";

  try {
  const response = await fetch("/convert", { 
  method: "POST",
  body: formData
});
;

    if (!response.ok) {
      status.textContent = "Error en la conversión";
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Crear enlace temporal para descarga
    const a = document.createElement("a");
    a.href = url;
    a.download = "resultado.docx";
    a.click();

    status.textContent = "Conversión completada";

  } catch (error) {
    console.error(error);
    status.textContent = "Ocurrió un error al conectar con el backend";
  }
});

