import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const getDocumentIDsByCode = async ({
  selectedCode,
  targetTable,
  params,
}: {
  selectedCode: (string | undefined)[];
  targetTable: string;
  params: string;
}) => {
  const collectionRef = collection(db, targetTable);
  const q = query(collectionRef, where(params, "in", selectedCode));
  try {
    const querySnapshot = await getDocs(q);
    const documentIDs = querySnapshot.docs.map((doc: any) => doc.id);
    return documentIDs;
  } catch (err) {
    throw err;
  }
};
