import { Fragment, useState, memo, useEffect } from "react";
import UseAxios from 'hooks/UseAxios';
import { GALLERY_UPDATE, GALLERY_DELETE } from 'api';
import { snackBarError } from 'components/Snackbar';

import Card from "components/Card";
import Button from 'components/Button';
import Input from 'components/Input';
import Icon from "icon";

const GalleryModal = ({ state, toggleClose, getData }) => {
  const [edit, setEdit] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [saveLoader, setSaveLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    setNewImageName(state.currentImage.imageName);
  }, [state])

  const toggleEdit = (status = false) => {
    setEdit(status);
  }

  const handleCloseModal = () => {
    toggleClose();
    toggleEdit();
  }

  const handleUpdate = async () => {
    try {
      if (newImageName.length > 6) {
        const formData = new FormData();
        formData.set('id', state.currentImage?.id);
        formData.set('imageName', newImageName);

        setSaveLoader(true);

        const updateData = await UseAxios(GALLERY_UPDATE, formData);

        setNewImageName(updateData?.data?.imageName);
        toggleEdit();
      }
      else {
        snackBarError('Image name cannot be empty or less than 6 characters');
      }
    }
    catch (error) {
      snackBarError('Error Occured');
    }

    setSaveLoader(false);
  }

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.set('id', state.currentImage?.id);

      setDeleteLoader(true);

      const deleteData = await UseAxios(GALLERY_DELETE, formData);

      if (deleteData) {
        getData();
      }

      handleCloseModal();
    }
    catch (error) {
      snackBarError('Error Occured');
    }

    setDeleteLoader(false);
  }

  return (
    <div className={`gallery__modal ${state.show ? 'gallery__modal--show' : ''}`}>
      <div className="gallery__overlay"></div>
      <Card className="gallery__card">
        <img className="gallery__image" src={state.currentImage?.url ? process.env.REACT_APP_IMAGE_URL + state.currentImage?.url : ''} alt="splash" />
        <div className="gallery__details">
          {!edit ?
            <Fragment>
              <div>
                <h3 className="gallery__imageName">{newImageName}</h3>
                <div className="gallery__attributes">
                  <div className="attr">Type</div>
                  <div className="value">Image</div>
                </div>
                <div className="gallery__attributes">
                  <div className="attr">Size</div>
                  <div className="value">18.6MB</div>
                </div>
                <div className="gallery__attributes">
                  <div className="attr">Created On</div>
                  <div className="value">12/06/21</div>
                </div>
              </div>
              <div className="gallery__action_buttons">
                <Button onClick={() => toggleEdit(true)}>
                  <Icon name="edit" on="button" />
                  Edit
                </Button>
                <Button
                  onClick={() => window.confirm("Are you sure to delete?") ? handleDelete() : null}
                  loading={deleteLoader}
                  disabled={deleteLoader}
                  primary
                >
                  <Icon name="delete" on="button" />
                  Delete
                </Button>
              </div>
            </Fragment>
            :
            <Fragment>
              <div>
                <h3>{newImageName}</h3>
                <span>Edit Image name</span>
                <Input value={newImageName} onChange={(e) => setNewImageName(e.target.value)} />
              </div>
              <div className="gallery__action_buttons">
                <Button onClick={() => handleUpdate()} loading={saveLoader} disabled={saveLoader}>
                  <Icon name="tick" on="button" />
                  Save
                </Button>
                <Button onClick={() => {
                  toggleEdit();
                  setNewImageName(state.currentImage.imageName)
                }} primary>
                  <Icon name="close" on="button" />
                  Cancel
                </Button>
              </div>
            </Fragment>
          }
          <Button className="gallery__icon" onClick={() => handleCloseModal()}>
            <Icon name="close" size="small" />
          </Button>
        </div>
      </Card>
    </div>
  )
};

export default memo(GalleryModal);