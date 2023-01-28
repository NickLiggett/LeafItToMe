import tomatoPic from "../assets/tomato_plant.jpeg"
const customers = [
  {
    id: 1,
    first_name: "Nick",
    last_name: "Liggett",
    username:"Nick2legit",
    password: "Nick91890!",
    city: "Littleton",
    state: "Colorado",
    zip_code: "80127",
    user_img: "",
    plants: [
      {
        id: 1,
        species: "Tomato Plant",
        img: tomatoPic,
        care_instructions: "Water twice a day, 1 cup.",
      },
    ],
  },
  {
    id: 2,
    first_name: "Fonda",
    last_name: "Coble",
    username:"FCoble69",
    password: "Fonda1982!",
    city: "Denver",
    state: "Colorado",
    zip_code: "80211",
    user_img: "",
    plants: [
      {
        id: 1,
        species: "Aloe",
        img: tomatoPic,
        care_instructions: "Water once a day, 1/2 cup.",
      },
      {
        id: 2,
        species: "Red One",
        img: tomatoPic,
        care_instructions: "Water twice a day, 1/4 cup.",
      },
    ],
  }
];

export default customers