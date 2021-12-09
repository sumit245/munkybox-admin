import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Documents(props) {
  const restaurant = useSelector((state) => state.restaurant);
  const [pod, setPod] = useState([]);
  const { documents } = restaurant;
  const { papers } = restaurant;
  useEffect(() => {
    let mount = true;
    if (mount) {
      setPod(papers);
    }
    return () => {
      mount = false;
    };
  }, [papers]);
  // useEffect(() => {
  //   let componentMounted = true;
  //   let pods = [];
  //   if (componentMounted) {
  //     documents.map((data, key) => {
  //       if (Array.isArray(data)) {
  //         pods.push(data);
  //       }
  //     });
  //     setPod(pods);
  //   }
  //   return () => {
  //     componentMounted = false;
  //     console.log(pods);
  //   };
  // }, []);

  return (
    <fieldset>
      <div className="row mt-2">
        {Array.isArray(documents)
          ? documents.map(
              (image, key) =>
                !Array.isArray(image) && (
                  <div className="col-lg-3" key={key}>
                    <div className="image">
                      <img
                        className="img-fluid"
                        alt="Profile"
                        src={Object.values(image)}
                      />
                    </div>
                    <div className="file-name">{Object.keys(image)}</div>
                  </div>
                )
            )
          : null}

        {Array.isArray(pod)
          ? pod.map((image, key) => (
              <div className="col-lg-3" key={key}>
                <div className="image">
                  <img className="img-fluid" alt="Profile" src={image.image} />
                </div>
                <div className="file-name">{image.image_name}</div>
              </div>
            ))
          : null}
      </div>
    </fieldset>
  );
}
