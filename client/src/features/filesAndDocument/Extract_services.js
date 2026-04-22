export const ExtractText = async (fileType, file) => {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!file) {
    alert("Please select a file");
    return;
  }
  const formdata = new FormData();
  formdata.append(fileType, file);

  console.log(SERVER_URL + fileType);

  const res = await fetch(SERVER_URL + fileType, {
    method: "POST",
    body: formdata,
    credentials: "include",
  });
  

  const data = await res.json();
  if (!data.success) {
    console.log(data.errorType);
    if (data.errorType === "AUTH") {
      router.push("/login");
    } else {
      return data.message;
    }
  }
  return data.text;
};
