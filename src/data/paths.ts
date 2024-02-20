import { IPaths } from "../utils/@Types";

export const paths: IPaths = {
  commands: [
    `La commande "<span class="main__text__command">cd</span>" permet de changer de lieu.`,
    `La commande "<span class="main__text__command">ls</span>" permet de LiSter des lieux et personnages avec qui interragir.`,
    `La commande "<span class="main__text__command">cat</span>" permet d'interragir avec des objets ou des personnes.`,
  ],
  Départ: {
    placeIntro: [
      "Bienvenue à Terminal, pays autrefois prospère et joyeux. test de délais",
      "Une sombre menace s'est levée.",
      "Une sorcière maléfique du nom de Morgana a répandu son ombre sur les terres fertiles, plongeant le pays dans le chaos et la désolation.",
      `Pour voir ce que vous pouvez faire, tapez "<span class="main__text__command">help</span>" dans l'invité de commande`,
    ],
    placeText: ["Un Hiboux majestueux vous observe"],
    name: "Départ",
    pnj: {
      Hiboux: {
        name: "Hiboux",
        pre_sentence: ["Bonjour petit homme, enfin reveillé?"],
        img: "/img/pnj/Hiboux.png",
      },
    },
    École: {placeIntro:["Vous arrivez devant l'école du terminal"], name: "École", Entrée: { name: "Entrée", message: "Bienvenue" } },
    Foret: { name: "Foret" },
  },
};
