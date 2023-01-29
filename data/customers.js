import tomatoPic from "../assets/tomato_plant.jpeg";
import aloePic from "../assets/aloe.webp";
import redPlantPic from "../assets/red_plant.webp";

const customers = [
  {
    id: 1,
    first_name: "Nick",
    last_name: "Liggett",
    username: "Nick",
    password: "Nick",
    city: "Littleton",
    state: "Colorado",
    zip_code: "80127",
    user_img: "",
    plants: [
      {
        id: 1,
        species: "Tomato Plant",
        img: tomatoPic,
        instructions:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
  {
    id: 2,
    first_name: "Fonda",
    last_name: "Coble",
    username: "Fonda",
    password: "Fonda",
    city: "Denver",
    state: "Colorado",
    zip_code: "80211",
    user_img: "",
    plants: [
      {
        id: 1,
        species: "Aloe",
        img: aloePic,
        instructions:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 2,
        species: "Red One",
        img: redPlantPic,
        instructions:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
];

export default customers;
