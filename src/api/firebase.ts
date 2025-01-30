import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from "firebase/firestore";
import { HealthInfluencerVerified } from "../interfaces/Research";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};


// This function will fetch data with pagination
export const fetchPagedData = async (pageSize: number, lastDoc: HealthInfluencerVerified | null = null) => {
    try {
      const influencersRef = collection(db, "health-influencers");
      let q = query(influencersRef, orderBy("name"), limit(pageSize));
  

      if (lastDoc) {
        q = query(q, startAfter(lastDoc)); 
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No more data available.");
        return { data: [], lastVisible: null };
      }
  
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  
      return { data, lastVisible };
    } catch (e) {
      console.error("Error fetching paged data: ", e);
      return { data: [], lastVisible: null };
    }
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
