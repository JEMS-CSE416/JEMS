import "./css/LeafletToImage.css";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import { useEffect } from "react";
import domtoimage from "dom-to-image";

export default function LeafletToImage() {
  const map = useMap();
  const mapDomNode = map.getContainer();

  // add a button to the map that will trigger a console.debug() when clicked
  useEffect(() => {
    const PNGControl = L.Control.extend({
      onAdd: function () {
        const div = L.DomUtil.create("div", "png-control");

        div.innerHTML = '<button type="button">Save as PNG</button>';
        div.onclick = function () {
          domtoimage.toBlob(mapDomNode).then(function (blob) {
            window.saveAs(blob, "my-node.png");
          });
        };
        return div;
      },
    });

    const JPGControl = L.Control.extend({
      onAdd: function () {
        const div = L.DomUtil.create("div", "jpg-control");

        div.innerHTML = '<button type="button">Save as JPG</button>';
        div.onclick = function () {
          domtoimage
            .toJpeg(mapDomNode, { quality: 0.95 })
            .then(function (dataUrl) {
              var link = document.createElement("a");
              link.download = "my-image-name.jpeg";
              link.href = dataUrl;
              link.click();
            });
        };
        return div;
      },
    });

    const pngControl = new PNGControl({ position: "topleft" });
    const jpgControl = new JPGControl({ position: "topleft" });
    pngControl.addTo(map);
    jpgControl.addTo(map);
    console.debug(mapDomNode);

    return () => {
      pngControl.remove();
      jpgControl.remove();
    };
  }, []);

  return <></>;
}
