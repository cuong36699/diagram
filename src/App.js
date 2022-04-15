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
      height: 440,
      transform: 'translate(-50%, -50%)',
      padding: "0px 10px",
      margin: 0,
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
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, padding: "10px 0px", borderBottom: "1px solid #EDEDED", }}>
          <p className='title-modal'>{itemClick?.item?.type} ID: {itemClick?.item?.id}</p>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, borderBottom: "1px solid #EDEDED", flexWrap: "wrap" }}>
          <div className='div-input'>
            <label className='lable-input'>Type</label>
            <input value={itemClick?.item?.itemType} className='input-value'></input>
          </div>
          <div className='div-input'>
            <label className='lable-input'>Height</label>
            <input value={itemClick?.item?.size?.height} className='input-value'></input>
          </div>
          <div className='div-input'>
            <label className='lable-input'>Width</label>
            <input value={itemClick?.item?.size?.width} className='input-value'></input>
          </div>
          <div className='div-input'>
            <label className='lable-input'>position-x</label>
            <input value={itemClick?.item?.position?.x} className='input-value'></input>
          </div>
          <div className='div-input'>
            <label className='lable-input'>position-y</label>
            <input value={itemClick?.item?.position?.y} className='input-value'></input>
          </div>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 50, paddingTop: "10px" }}>
          <div onClick={() => {
            closeModal();
          }} style={{ width: 100, height: 40, backgroundColor: '#337ab7', justifyContent: 'center', alignItems: "center", display: 'flex', cursor: "pointer", marginRight: 20, border: "1px solid #EDEDED", borderRadius: 4 }}>
            <p style={{ color: "#fff", fontWeight: "600" }}>Save</p>
          </div>
          <div onClick={() => {
            closeModal();
          }} style={{ width: 100, height: 40, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: "center", display: 'flex', cursor: "pointer", border: "1px solid #EDEDED", borderRadius: 4 }}>
            <p style={{ color: "#000", fontWeight: "600" }}>Cancel</p>
          </div>
        </div>
      </Modal >
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
    </div >

  )
}