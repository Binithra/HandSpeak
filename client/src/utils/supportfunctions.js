// import { deleteObject, ref } from "firebase/storage";
// import { storage } from "../config/firebase.config";

export const filters = [
  { id: 1, name: "Colors", value: "Colors" },
  { id: 2, name: "Daily Usage", value: "Daily Usage" },
  { id: 3, name: "Fruits", value: "Fruits" },
  { id: 4, name: "Greetings", value: "Greetings" },
  { id: 5, name: "Letters", value: "Letters" },
  { id: 6, name: "Number", value: "Number" },
  { id: 7, name: "Places", value: "Places" },
  { id: 8, name: "People", value: "People" },
  
];

export const filterByLevel = [
  { id: 1, name: "Beginner", value: "Beginner" },
  { id: 2, name: "Intermediate", value: "Intermediate" },
  { id: 3, name: "Advanced", value: "Advanced" },
];

// export const deleteFileObject = (referenceUrl) => {
//   const deleteRef = ref(storage, referenceUrl);
//   deleteObject(deleteRef)
//     .then(() => {
//       return true;
//     })
//     .catch((error) => {
//       return false;
//     });
// };