import { useState, useEffect } from "react";

export function useDataByUrl(url) {
  const [dataUrl, setDataUrl] = useState(url);
  const [dataResponse, setDataResponse] = useState("test");

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => setDataResponse(data));
  }, []);

  if (dataResponse !== "test") {
    return dataResponse;
  }
}
