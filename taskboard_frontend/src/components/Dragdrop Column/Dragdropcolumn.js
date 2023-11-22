import React, { useRef } from "react";
import {useDrop } from "react-dnd";


const Dragdropcolumn = ({ boardno, changeTaskboardno, children }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "card",
      drop(item) {
        changeTaskboardno(item.id, boardno);
      }
    });
    drop(ref);
    return <div ref={ref}> {children}</div>;
  };

  export default Dragdropcolumn;