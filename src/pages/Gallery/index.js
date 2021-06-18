import { createRef, Fragment, useEffect, useState } from "react";
import UseAxios from 'hooks/UseAxios';
import { GALLERY, GALLERY_CREATE } from 'api';
import { snackBarSuccess, snackBarError } from 'components/Snackbar';

import Card from "components/Card";
import Button from 'components/Button';
import ProgresiveImageLoader from "components/ProgressiveImageLoader";
import Loader from "components/Loader";
import Icon from "icon";
import GalleryModal from "./GalleryModal";
import NoImage from '../../images/no-image.png';

const Gallery = () => {
  const uploadRef = createRef(null);

  const [state, setState] = useState({
    show: false,
    currentImage: "",
    loading: true,
    uploading: false,
    data: []
  });

  const getData = async () => {
    console.log('here');
    !state.loading && setState(s => ({ ...s, loading: true }));
    try {
      const gallery = await UseAxios(GALLERY);
      setState(s => ({ ...s, data: gallery?.data }));
    }
    catch (error) {
      snackBarError('Error Occured');
    }

    setState(s => ({ ...s, loading: false }));
  }

  useEffect(() => {
    getData();
  }, []);

  const handleModalShow = (image) => {
    setState(s => ({
      ...s,
      currentImage: image,
      show: true
    }));
  }

  const toggleClose = () => {
    setState(s => ({
      ...s,
      show: false
    }));
  }

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.set('image', file);

    setState(s => ({ ...s, uploading: true }));

    if (file) {
      try {
        const response = await UseAxios(GALLERY_CREATE, formData);
        if (response?.error) {
          snackBarError(response.message);
          setState(s => ({ ...s, uploading: false }));
          return;
        }

        getData();
      }
      catch (error) {
        snackBarError('Error Occured');
      }
    }

    setState(s => ({ ...s, uploading: false }));
  }

  return (
    <Fragment>
      <Card className="gallery">
        <Loader loading={state.loading}>
          {state.data && state.data.length <= 0 &&
            (
              <Fragment>
                <h3>No Image in gallery!</h3>
                <img className="gallery--no-image" src={NoImage} alt="no-img" />
                <p className="text-muted">Click the upload button to add image</p>
              </Fragment>
            )
          }
          <div className="gallery__container">
            {state.data && state.data.map((image, index) => {
              let key = index + 1;
              return <ProgresiveImageLoader key={'image' + key} onClick={() => handleModalShow(image)} styleName={`gallery__image ${key % 4 === 0 ? 'gallery__image--big2' : key % 7 === 0 ? 'gallery__image--big1' : ''}`} url={image.url} alt="splash" />
            })}
          </div>
          <GalleryModal {...{ state, toggleClose, getData }} />
        </Loader>
      </Card>
      <Button className="upload_icon" loading={state.uploading} disabled={state.uploading} primary>
        <input className="upload_icon__file" type="file" ref={uploadRef} onChange={e => handleImageUpload(e)} />
        <Icon name="upload" on="button" />
        Upload
      </Button>
    </Fragment>
  )
}

export default Gallery;