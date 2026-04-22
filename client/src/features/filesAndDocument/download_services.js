export const downloadAsPdf = async (rawText) => {
  const filename = prompt("Enter a file name");
  if (filename === null) {
    return;
  }

  if (filename?.trim() === "") {
    alert("Filename cannot be empty");
    return;
  }
  setLoading(true);
  const response = await fetch(SERVER_URL + "/downloadPdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rawText }),
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "Viseverse.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadAsDocx = async (rawText) => {
  const filename = prompt("Enter a file name");
  if (filename === null) {
    return;
  }

  if (filename?.trim() === "") {
    alert("Filename cannot be empty");
    return;
  }
  setLoading(true);
  const response = await fetch(SERVER_URL + "/downloadDocx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rawText }),
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "Viseverse.docx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadAsTxt = async (rawText) => {
  const filename = prompt("Enter a file name");
  if (filename === null) {
    return;
  }

  if (filename?.trim() === "") {
    alert("Filename cannot be empty");
    return;
  }

  setLoading(true);

  const blob = new Blob([rawText], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "Viseverse.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

