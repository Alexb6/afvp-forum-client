import React from "react";
import { connect } from "react-redux";
// import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";

import "./profile-image.styles.scss";

import PencilEditIcon from "./../../../../components/button/pencil-edit-icon/pencil-edit-icon.component";
import FormCancelValidButtons from "./../../../../components/form/form-cancel-valid-buttons/form-cancel-valid-buttons.component";
import CustomSmallButton from "./../../../../components/button/custom-small-button/custom-small-button.component";
import { updateUserProfileImageAsync } from "./../../../../redux/user/user-action-functions";
import ImageCropModalPopUp from "./image-crop-modal/image-crop-modal.component";

const INITIAL_STATE = {
  src: null,
  crop: {
    unit: "%",
    width: 50,
    x: 25,
    y: 25,
    aspect: 1 / 1,
  },
  imageName: "",
  imageType: "",
  imageObject: {},
  imageUrlState: "",
  imageFormOpen: false,
  imageCropOpen: false,
};

class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  mapImageInfosToState = ({ photo_url }) => {
    this.setState({
      imageName: "",
      imageType: "",
      imageUrlState: photo_url ? photo_url : "",
      src: null,
      crop: {
        unit: "%",
        width: 50,
        x: 25,
        y: 25,
        aspect: 1 / 1,
      },
      imageObject: {},
    });
  };

  handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({
        imageName: e.target.files[0].name,
        imageType: e.target.files[0].type,
        imageCropOpen: true,
      });
    } else {
      this.setState({ imageName: "", imageType: "", imageCropOpen: false });
    }
  };

  handleimageFormOpen = () => {
    this.setState({ imageFormOpen: true });
    this.mapImageInfosToState(this.props.userProfile);
  };

  handlephotoFormClose = () => {
    this.setState({ imageFormOpen: false });
    this.mapImageInfosToState(INITIAL_STATE);
  };

  handlephotoFormSubmit = async (e) => {
    e.preventDefault();
    const { accessToken, updateUserProfileImageAsync } = this.props;
    const imageData = new FormData();
    imageData.append("photo_url", this.state.imageObject);
    await updateUserProfileImageAsync([accessToken, imageData]);
    this.handlephotoFormClose();
  };

  handleImageCropClose = () => {
    this.setState({ imageCropOpen: false, imageName: "" });
    this.imageInput.value = ""; // reset the file's input value
    this.mapImageInfosToState(INITIAL_STATE);
  };

  handleImageCropValid = () => {
    this.setState({ imageCropOpen: false });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        this.state.imageName
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          this.setState({ imageObject: blob });
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        this.state.imageType,
        1
      );
    });
  }

  render() {
    const {
      userProfile: { photo_url, first_name, family_name },
    } = this.props;
    const { imageName, imageFormOpen, imageCropOpen, crop, src } = this.state;
    return (
      <div className="profile--image">
        {imageFormOpen ? (
          <form className="photo--form" autoComplete="off">
            <input
              type="file"
              hidden
              onChange={this.handleImageChange}
              ref={(el) => (this.imageInput = el)}
            />
            <div id="pickImage--warning">
              Veuillez selectionner une image avec un poids inférieur à 3 méga
              octets pour faciliter son traitement et son téléversement.
            </div>
            <div id="pickImage">
              <CustomSmallButton
                type="button"
                className="custom-small-button--negative--gray-blue"
                onClick={() => this.imageInput.click()}
              >
                Choisir une image
              </CustomSmallButton>
            </div>
            {imageName && <div id="photo--name"> {imageName} </div>}
            {src && imageCropOpen && (
              <ImageCropModalPopUp
                open={imageCropOpen}
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onCropComplete={this.onCropComplete}
                onCropChange={this.onCropChange}
                handleImageCropClose={this.handleImageCropClose}
                handleImageCropValid={this.handleImageCropValid}
              />
            )}
            <FormCancelValidButtons
              closeForm={this.handlephotoFormClose}
              closeText="Annuler"
              submitText="Modifier"
              submitForm={this.handlephotoFormSubmit}
            />
          </form>
        ) : (
          <>
            {photo_url ? (
              <div className="photo--link">
                <img
                  className="link"
                  src={`${process.env.REACT_APP_SERVER_ORIGIN}/${photo_url}`}
                  alt={`${first_name} ${family_name}`}
                />
                <PencilEditIcon onClick={this.handleimageFormOpen} />
              </div>
            ) : (
              <div className="photo--gradient">
                <div className="gradient"></div>
                <PencilEditIcon onClick={this.handleimageFormOpen} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  accessToken: auth.accessToken,
  userProfile: user.userProfile,
});
const mapDispatchToProps = (dispatch) => ({
  updateUserProfileImageAsync: (userData) =>
    dispatch(updateUserProfileImageAsync(userData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
