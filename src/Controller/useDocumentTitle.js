import { useEffect, useState } from "react";

const useDocumentTitle = title => {
  const [document_title, setDocumentTitle] = useState(title);
   useEffect(() => {
    document.title = document_title + " - NKULULEKO DOT IO STORE"; 
  },[document_title]);

  return [document_title, setDocumentTitle];
};

export {useDocumentTitle};