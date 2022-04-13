import React, { useEffect, useRef } from 'react'
import Diagram, { CustomShape, ConnectionPoint, Group, Toolbox } from 'devextreme-react/diagram';
import Vector from "./Vector.svg"
import 'whatwg-fetch';
import Data from './data';
export default function App() {
  const diagramRef = useRef(null);

  useEffect(() => {
    const diagram = diagramRef.current.instance;
    // diagram.import(JSON.stringify(Data));
  }, [])

  const imageSVG = [
    {
      value: "https://cdn.vjmaas.com/insecure/rs:fit:400:400:0:1/wm:0.5:soea:0:0:0.2/plain/https://vjm-dev.s3.ap-southeast-1.amazonaws.com/images/%E4%B8%BB%E5%9B%BE-01.jpg",
      key: 1
    },
    {
      value: "https://cdn.vjmaas.com/insecure/rs:fit:400:400:0:1/wm:0.5:soea:0:0:0.2/plain/https://vjm-dev.s3.ap-southeast-1.amazonaws.com/images/%E4%B8%BB%E5%9B%BE-01.png",
      key: 1
    },
  ]


  return (
    <Diagram allowEditImage={true} id="diagram" ref={diagramRef} >
      {imageSVG.map((r, index) => {
        return (
          <CustomShape
            allowEditImage={true}
            category="general"
            type={`Group${index}`}
            title={`Group${index}`}
            backgroundImageUrl={r.value}
            backgroundImageLeft={0.15}
            backgroundImageTop={0}
            backgroundImageWidth={0.7}
            backgroundImageHeight={0.7}
            defaultWidth={2}
            defaultHeight={2}
            defaultText={`Group${index}`}
            allowEditText={true}
            textLeft={0}
            textTop={0.7}
            textWidth={1}
            textHeight={0.3}>
            <ConnectionPoint x={0.5} y={0} />
            <ConnectionPoint x={0.9} y={0.5} />
            <ConnectionPoint x={0.5} y={1} />
            <ConnectionPoint x={0.1} y={0.5} />
          </CustomShape>
        )
      })}
    </Diagram>

  )
}