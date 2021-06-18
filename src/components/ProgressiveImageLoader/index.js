import { useState, memo } from "react";
import styled from "styled-components";

const ImageLoaderStyle = styled.div`
  height: 250px;
  position: relative;

  & .originalImage{
    position: relative;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  & .thumbnailImage{
    position: absolute;
    left: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    filter: blur(3px);
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

const ProgresiveImageLoader = ({ url, alt, styleName, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const source = process.env.REACT_APP_IMAGE_URL + url;
  const thumbnail = process.env.REACT_APP_IMAGE_URL + 'thumbnail_' + url;;

  return (
    <ImageLoaderStyle className={styleName}>
      <img
        className={"originalImage " + styleName}
        src={source}
        loading="lazy"
        style={{
          opacity: imageLoaded ? "1" : "0",
        }}
        onLoad={() => setImageLoaded(true)}
        onClick={onClick}
        alt={alt}
      />

      <img
        className={"thumbnailImage " + styleName}
        style={{
          opacity: imageLoaded ? "0" : "1",
        }}
        src={thumbnail}
        alt={alt}
      />
    </ImageLoaderStyle>
  );
};

export default memo(ProgresiveImageLoader);