//TODO: pour remonter, trouver un chemin avec le nombre de ../../ pour laisser 2éléments dans le tableau des chemin
export const findPath = <T, K extends keyof T>(
  objet: T,
  chemin: string[],
): T[K] | undefined => {
  //Get the first key of the path in the object
  const propriete = chemin.shift();

  //if there is no more propriete in the chemin array or there is an empty string (case of / at the end of prompt)
  if (chemin.length === 0 || (chemin.length === 1 && chemin[0] === "")) {
    //return of the found object
    if ((objet as any)[propriete!] === undefined) return undefined;
    return (objet as any)[propriete!];
  } else {
    //we launch the findPath again
    return findPath((objet as any)[propriete!], chemin);
  }
};

export const makeNewInputPath=(currentPath:string[],inputPaths:string[])=>{
  if (currentPath.length) {
    let newPath = [...currentPath];
    inputPaths.forEach((path) => {
      if (path === "..") {
        inputPaths.slice(1);
        newPath.pop();
      }
      if (path === "") {
        inputPaths.slice(1);
      }
      if (path !== "" && path !== "..") {
        newPath.push(path);
      }
    });
    inputPaths = [...newPath];
    return inputPaths
  }
  return inputPaths
}

export const isCommand = (inputCommand: string): boolean => {
  const inputValid = inputCommand.split(" ")[0] === "cd";

  if (inputValid) return true;
  return false;
};

