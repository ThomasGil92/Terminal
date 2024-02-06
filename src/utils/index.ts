
//TODO: pour remonter, trouver un chemin avec le nombre de ../../ pour laisser 2éléments dans le tableau des chemin
export const findPath = <T, K extends keyof T>(objet: T, chemin: string[]):T[K]|undefined => {
  console.log(chemin)
  const propriete = chemin.shift();
  if (objet && propriete !== undefined && objet.hasOwnProperty(propriete)) {
    if (chemin.length === 0 ||chemin.length===1 && chemin[0]==="") {
      return (objet as any) [propriete];
    } else {
      return findPath((objet as any)[propriete], chemin);
    }
  }

  return undefined;
};


export const isCommand=(inputCommand:string):boolean=>{
const inputValid=inputCommand.split(" ")[0]==="cd"

if (inputValid) return true
return false
}



