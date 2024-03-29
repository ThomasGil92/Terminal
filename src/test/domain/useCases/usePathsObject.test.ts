import { describe, test, it, expect, beforeEach, vi, afterEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePathObject } from "../../../domain/useCases/usePathsObject";
import { paths } from "../../../data/paths";
import { findPnj, isTherePnj } from "@/utils";

describe("usePathObject custom hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should render initial state", () => {
    const { result } = renderHook(() =>
      usePathObject(["Départ"], paths.Départ),
    );

    expect(result.current.currentObject).toStrictEqual(paths.Départ);
  });
  describe("cd command", () => {
    beforeEach(()=>{
      localStorage.clear()
    })
    it("should render Foret object with cd command", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );
      act(() => {
        result.current.handleFormSubmit(["Foret"], "cd Foret");
      }),
        act(() => {
          vi.advanceTimersByTime(3000);
        });
      expect(result.current.currentObject).toStrictEqual(paths.Départ.Foret);
    });
    it("should render Départ object from Foret", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ", "Foret"], paths.Départ.Foret),
      );
      act(() => {
        result.current.handleFormSubmit([".."], "cd ..");
      }),
        act(() => vi.advanceTimersByTime(2000));
      expect(result.current.currentObject).toStrictEqual(paths.Départ);
      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          {
            sentence: paths.Départ.placeIntro[0],
            tag: { name: "p" },
          },
        ]),
      );
    });
    it("should render École object from Foret", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ", "Foret"], paths.Départ.Foret),
      );
      act(() => {
        result.current.handleFormSubmit(["..", "École"], "cd ../École");
      }) ,
        act(() => {
          vi.advanceTimersByTime(5000);
        });

      expect(result.current.currentObject).toStrictEqual(paths.Départ.École);
      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          {
            sentence: `${paths.Départ.École.placeIntro[0]}`,
            tag: { name: "p" },
          },
        ]),
      );
    });
    it("should render error message", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ", "Foret"], paths.Départ.Foret),
      );
      act(() => {
        result.current.handleFormSubmit(
          ["..", "Discothèque"],
          "cd ../Discothèque",
        ),
        act(() => {
          vi.advanceTimersByTime(5000);
        });
      });
      expect(result.current.lines).toStrictEqual(expect.arrayContaining([
        {
          sentence: `Aucun chemin ne correspond.`,
          tag: { name: "p" },
        },
      ]));
    });
  });
  describe("ls command", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should render the accessible paths and pnjs at currentPath", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );

      act(() => {
        result.current.handleFormSubmit(["Départ"], "ls");
      }),
        act(() => {
          vi.advanceTimersByTime(3000);
        });

      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          {
            sentence: `Vous pouvez accéder à:`,
            tag: { name: "p" },
          },
          {
            sentence: `École`,
            tag: { name: "li", classes: "list__place" },
          },
          {
            sentence: `Foret`,
            tag: { name: "li", classes: "list__place" },
          },
          {
            sentence: `Vous pouvez parler avec:`,
            tag: { name: "p" },
          },
          {
            sentence: `Hiboux`,
            tag: { name: "li", classes: "list__pnj" },
          },
        ]),
      );
    });
    it("should render nothing if there is no accessible path in current path", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ", "Foret"], paths.Départ.Foret),
      );
      act(() => {
        result.current.handleFormSubmit(["Départ", "Foret"], "ls");
      }),
        act(() => {
          vi.advanceTimersByTime(3000);
        });
      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          { sentence: `C'est un cul-de-sac`, tag: { name: "p" } },
        ]),
      );
    });
  });
  describe("cat command", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should make a pnj talk with the right path", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );
      act(() => {
        result.current.handleFormSubmit(["Hiboux"], "cat Hiboux");
      }),
        act(() => {
          vi.advanceTimersByTime(4000);
        });
      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          {
            sentence: "Hiboux",
            tag: {
              classes: "displayedLine_img",
              img: "/img/pnj/Hiboux.png",
              name: "img",
            },
          },
          { sentence: "Le hiboux vous fixe.", tag: { name: "p" } },
          {
            sentence:
              "Puis comme s'il voulait vous montrer le chemin, il tourne la tête vers un somptueux chateau.",
            tag: { name: "p" },
          },
        ]),
      );
    });
    it("shouldn't make a pnj talk with the wrong path", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );
      act(() => {
        result.current.handleFormSubmit(["Dingo"], "cat Dingo");
      }),
        act(() => {
          vi.advanceTimersByTime(4000);
        });
      expect(result.current.lines).toContainEqual({
        sentence: `Aucun personnage ne porte le nom Dingo`,
        tag: { name: "p" },
      });
    });
  });
  describe("help command", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it("should render all commands and their purpose", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );
      act(() => {
        vi.advanceTimersByTime(4000);
      }),
        act(() => {
          result.current.handleFormSubmit(["help"], "help");
        }),
        act(() => {
          vi.advanceTimersByTime(4000);
        });

      expect(result.current.lines).toStrictEqual(
        expect.arrayContaining([
          {
            sentence: `La commande "<span class="main__text__command">cd</span>" permet de changer de lieu.`,
            tag: { name: "p", classes: "list__help" },
          },
          {
            sentence: `La commande "<span class="main__text__command">ls</span>" permet de LiSter des lieux et personnages avec qui interragir.`,
            tag: { name: "p", classes: "list__help" },
          },
          {
            sentence: `La commande "<span class="main__text__command">cat</span>" permet d'interragir avec des objets ou des personnes.`,
            tag: { name: "p", classes: "list__help" },
          },
        ]),
      );
    });
  });
  describe("Undefined commands", () => {
    it("should render unknown command if command is not known", () => {
      const { result } = renderHook(() =>
        usePathObject(["Départ"], paths.Départ),
      );
      act(() => {
        result.current.handleFormSubmit(["Foret"], "go Foret");
      });
      expect(result.current.lines).toContainEqual({
        sentence: `Commande inconnue`,
        tag: { name: "p" },
      });
    });
  });
});
