import { IPaths } from "../utils/@Types";

export const paths: IPaths = {
  commands: [
    `La commande "<span class="main__text__command">cd</span>" permet de changer de lieu.`,
    `La commande "<span class="main__text__command">ls</span>" permet de LiSter des lieux et personnages avec qui interragir.`,
    `La commande "<span class="main__text__command">cat</span>" permet d'interragir avec des objets ou des personnes.`,
  ],
  Départ: {
    placeIntro: [
      "Bienvenue à Terminal, pays autrefois prospère et joyeux.",
      "Une sombre menace s'est levée.",
      "Une sorcière maléfique du nom de Morgana a répandu son ombre sur les terres fertiles, plongeant le pays dans le chaos et la désolation.",
      "Vous êtes endormi sous un arbre",
      "Un Hiboux majestueux vous observe pendant que vous vous réveillez doucement",
      `Pour voir ce que vous pouvez faire, tapez "<span class="main__text__command">help</span>" dans l'invité de commande`,
    ],
    name: "Départ",
    pnj: {
      Hiboux: {
        name: "Hiboux",
        pre_sentence: [
          "Le hiboux vous fixe.",
          "Puis comme s'il voulait vous montrer le chemin, il tourne la tête vers un somptueux chateau.",
          `On dirait une <span class="main__text__place">Ècole</span>`,
        ],
        img: "/img/pnj/Hiboux.png",
      },
    },
    École: {
      placeIntro: [
        "Vous êtes devant l'école de Terminal.",
        "La porte s'ouvre devant vous.",
      ],
      name: "École",
      HallEntrée: {
        name: "Hall d'entrée",
        placeIntro: [
          "Vous êtes dans le hall d'entrée de l'école.",
          "De nombreux portraits hornent les murs de pierre, et vous observent.",
          "Un vieil homme doté d'une longue barbe à l'air de vous attendre.",
        ],
        pnj: {
          VieilHomme: {
            name: "Silas",
            pre_sentence: [
              "- Tu est enfin là, je t'ai vu vagabonder devant l'école en arrivant tôt ce matin.",
              "Silas à l'air de vous juger.",
              "- On a pas le temps de te faire faire tout le parcours général donc on va commencer par te tester un peu avant de t'enseigner notre secret. La situation l'éxige",
              "Silas vous montre un escalier qui mène à une salle.",
              "- Vas, et accomplie ton destin!",
            ],
          },
        },
        SalleDeCours: {
          name: "Salle de cours",
          placeIntro: [
            "Après avoir monté l'escalier en pierre, vous rentrez dans une salle.",
            "Une dame avec des lunettes est debout derrière son pupitre, elle vous attends.",
            "- Bonjour, il vaut mieux tard que jamais.",
            "- Commencons vite!",
          ],
          pnj: {
            MaîtreOrion: { name: "Maître Orion Spellbinder", pre_sentence: [] },
          },
        },
      },
    },
    Foret: { name: "Foret" },
  },
};
