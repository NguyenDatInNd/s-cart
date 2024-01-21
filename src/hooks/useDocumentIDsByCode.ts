import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const useDocumentIDsByCode = (
  codeSelected: string[],
  positon: string,
  params: string
) => {
  const [documentIDs, setDocumentIDs] = useState<string[]>([]);

  useEffect(() => {
    const getDocumentIDsByCode = async () => {
      if (codeSelected.length > 0) {
        const collectionRef = collection(db, positon);
        const q = query(collectionRef, where(params, "in", codeSelected));

        try {
          const querySnapshot = await getDocs(q);
          const documentIDs = querySnapshot.docs.map((doc) => doc.id);
          setDocumentIDs(documentIDs);
        } catch (error) {
          console.error("Error getting document IDs:", error);
        }
      }
    };

    getDocumentIDsByCode();
  }, [codeSelected]);

  return documentIDs;
};

export default useDocumentIDsByCode;
