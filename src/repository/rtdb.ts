import { getDatabase, ref } from "firebase/database";
import firebase from "../firebase";

const rtdb = ref(getDatabase(firebase));

export default rtdb;
