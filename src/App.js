import React, { useEffect, useRef, useState } from 'react'
import Diagram, { CustomShape, ConnectionPoint, Group, Toolbox, MainToolbar, Command, AutoLayout, Nodes } from 'devextreme-react/diagram';
import 'whatwg-fetch';
import Modal from 'react-modal';

export default function App() {
  const diagramRef = useRef(null);
  const [itemClick, setItemClick] = useState(null);

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

  const onHandleValue = () => {
    if (diagramRef) {
      const diagram = diagramRef.current.instance;
      // diagram.import(JSON.stringify(state));
      // setState(diagram.export())
      console.log(diagram.export(), "diagram.export()")
    }
  }
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleOpen = (item) => {
    console.log(item, "item")
    setItemClick(item);
    openModal();
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{itemClick?.item?.type} ID: {itemClick?.item?.id}</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <Diagram
        // is on change
        // onRequestEditOperation={(a, b, c) => {
        // console.log(a, "Ádasd")
        // console.log(b, "Ádasd")
        // console.log(c, "Ádasd")
        // }}
        hasChanges={true}
        // autoZoomMode="fitWidth"
        simpleView={true}
        onItemDblClick={(item) => {
          handleOpen(item);
        }}
        allowEditImage={true}
        id="diagram" ref={diagramRef} >
        {imageSVG.map((r, index) => {
          return (
            <CustomShape
              key={index}
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
        <MainToolbar visible={true}>
          <Command name="undo" />
          <Command name="redo" />
          <Command name="separator" />
          <Command name="fontName" />
          <Command name="fontSize" />
          <Command name="separator" />
          <Command name="bold" />
          <Command name="italic" />
          <Command name="underline" />
          <Command name="separator" />
          <Command name="fontColor" />
          <Command name="lineColor" />
          <Command name="fillColor" />
          <Command name="separator" />
          <Command name="clear" icon="clearsquare" text="Clear Diagram" />
        </MainToolbar>
      </Diagram>
      <div onClick={() => {
        onHandleValue();
      }} style={{ width: 100, height: 46, backgroundColor: '#337ab7', position: "absolute", top: 9, right: 9, justifyContent: 'center', alignItems: "center", display: 'flex', cursor: "pointer", zIndex: 1000 }}>
        <p style={{ color: "#fff", fontWeight: "600" }}>Save</p>
      </div>
    </div>

  )
}