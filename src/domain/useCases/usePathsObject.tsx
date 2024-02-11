import { useEffect, useState } from "react";
import { paths } from "../../utils/paths";

export function usePathObject<T,U>  (cPath:T,cObject:U)  {
  const [currentPath, setCurrentPath] = useState(cPath);
  const [currentObject, setCurrentObject] = useState(cObject);

  return { currentPath, setCurrentPath, currentObject, setCurrentObject };
};
