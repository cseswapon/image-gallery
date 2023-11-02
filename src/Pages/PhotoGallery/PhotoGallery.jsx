import update from "immutability-helper";
import { useState } from "react";
import LayOutImages from "../../Components/LayoutImages/LayOutImages";
import "./PhotoGallery.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const PhotoGallery = () => {
  const images = [
    {
      id: 1,
      name: "/public/img/image-1.webp",
    },
    {
      id: 2,
      name: "/public/img/image-2.webp",
    },
    {
      id: 3,
      name: "/public/img/image-3.webp",
    },
    {
      id: 4,
      name: "/public/img/image-4.webp",
    },
    {
      id: 5,
      name: "/public/img/image-5.webp",
    },
    {
      id: 6,
      name: "/public/img/image-6.webp",
    },
    {
      id: 7,
      name: "/public/img/image-7.webp",
    },
    {
      id: 8,
      name: "/public/img/image-8.webp",
    },
    {
      id: 9,
      name: "/public/img/image-9.webp",
    },
    {
      id: 10,
      name: "/public/img/image-10.jpeg",
    },
    {
      id: 11,
      name: "/public/img/image-11.jpeg",
    },
  ];
  const [state, setState] = useState({
    count: 0,
    selected: [],
    allImage: images,
    addImages: [],
  });

  const { count, allImage, selected } = state;

  const handelDelete = () => {
    const commonIds = allImage
      .filter((objA) => selected.some((objB) => objB === objA.id))
      .map((obj) => obj.id);

    const newArray = [...allImage].filter((obj) => !commonIds.includes(obj.id));

    setState({
      ...state,
      count: 0,
      selected: [],
      allImage: newArray,
    });
  };

  // console.log(state);

  const moveGrid = (dragIndex, hoverIndex) => {
    const dragCard = allImage[dragIndex];
    setState(
      update(state, {
        allImage: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        },
      })
    );
  };

  const handelImageUpload = (e) => {
    const newImage = {
      id: allImage.length + 1,
      name: URL.createObjectURL(e.target.files[0]),
    };
    setState({
      ...state,
      allImage: [...allImage, newImage],
    });
  };

  return (
    <div className="photo-gallery">
      {/* photo gallery header section */}
      <div className="gallery-header">
        {count > 0 ? (
          <>
            <h3>
              <input type="checkbox" defaultChecked={true} /> {count} File
              Selected
            </h3>
            <p className="delete-file" onClick={handelDelete}>
              Delete files
            </p>
          </>
        ) : (
          <>
            <h3>Gallery</h3>
          </>
        )}
      </div>
      {/* photo gallery body section */}
      <DndProvider backend={HTML5Backend}>
        <div className="image-grid">
          {allImage.map((image, index) => (
            <LayOutImages
              key={index}
              image={image}
              index={index}
              state={state}
              handelSet={setState}
              moveGrid={moveGrid}
            />
          ))}
          <div
            style={{
              border: "2px dotted gray",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <img src="/public/img/addImage.png" alt="addImage" />
            <input
              className="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handelImageUpload}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default PhotoGallery;
