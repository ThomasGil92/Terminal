//TODO: pour remonter, trouver un chemin avec le nombre de ../../ pour laisser 2éléments dans le tableau des chemin
export const findPath = <T, K extends keyof T>(
  objet: T,
  chemin: string[],
): T[K] | undefined => {
  //Get the first key of the path in the object
  const propriete = chemin.shift();

  //if the current object has a key === propriete
  if (objet && propriete !== undefined) {
    //if there is no more propriete in the chemin array or there is an empty string (case of / at the end of prompt)
    if (chemin.length === 0 || (chemin.length === 1 && chemin[0] === "")) {
      //return of the found object
      return (objet as any)[propriete];
    } else {
      //we launch the findPath again
      return findPath((objet as any)[propriete], chemin);
    }
  }
  console.error("pas de path");
  return undefined;
};

export const isCommand = (inputCommand: string): boolean => {
  const inputValid = inputCommand.split(" ")[0] === "cd";

  if (inputValid) return true;
  return false;
};

// Define the parent object
var parentObject = {
  childObject: {
    nestedProperty: "value",
    grandChild: { message: "hello" },
  },
};

const obj = {
  Départ: {
    name: "Départ",
    École: { name: "École", Entrée: { name: "Entrée", message: "Bienvenue" } },
  },
};
const obj2 = { Entrée: { name: "Entrée", message: "Bienvenue" } };

// Function to get the parent object of a nested property
/* function getParentObject(obj, prop) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        if (obj[key] === prop) {
          console.log(obj[key],prop,key)
          return obj;
        } else {
          var parent = getParentObject(obj[key], prop);
          if (parent !== null) {
            console.log("parent: ",parent)
            return parent;
          }
        }
      }
    }
  }
  return null;
}

// Example usage
var grandChild = parentObject.childObject.grandChild;
var child = parentObject.childObject;
var child2=obj.Départ.École
var parentOfGrandChilddObject = getParentObject(parentObject, grandChild);
var parentOfChildObject = getParentObject(parentObject, child);
var test = getParentObject(obj, child2);
console.log(test);
 */
