import { useEffect } from "react";

export default function useclickOutSide(Refrance, Function) {
  useEffect(() => {
    const listener = (e) => {
      //if no refrance or listener clicks contains refrance div return
      if (!Refrance.current || Refrance.current.contains(e.target)) {
        // console.log(Refrance.current.contains(e.target));

        return;
      }
      //else run callback function
      Function();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    //every time refrance changes it gets called
  }, [Refrance]);
}
