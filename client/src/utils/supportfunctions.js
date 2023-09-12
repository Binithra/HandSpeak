// import { deleteObject, ref } from "firebase/storage";
// import { storage } from "../config/firebase.config";

export const filters = [
  { id: 1, name: "Letters", value: "Letters" },
  { id: 2, name: "Number", value: "Number" },
  { id: 3, name: "People", value: "People" },
  { id: 4, name: "Fruits", value: "Fruits" },
  { id: 5, name: "Places", value: "Places" },
  { id: 6, name: "Greetings", value: "Greetings" },
  { id: 7, name: "Daily Usage", value: "Daily Usage" },
  { id: 8, name: "Colors", value: "Colors" },
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