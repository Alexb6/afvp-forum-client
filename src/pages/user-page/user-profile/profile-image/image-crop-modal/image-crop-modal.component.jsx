import React from 'react';
import ReactCrop from 'react-image-crop';
import CustomSmallButton from '../../../../../components/button/custom-small-button/custom-small-button.component';

import './image-crop-modal.styles.scss';

class ImageCropModalPopUp extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         cropContainerHeight: null
      }
   }

   calcOverlayHeight = () => {
      if (this.props.src) {
         this.setState({ cropContainerHeight: this.cropContainer.offsetHeight });
      }
   }

   componentDidMount() {
      this.calcOverlayHeight();
   }

   render() {
      const { src, crop, onImageLoaded, onCropComplete, onCropChange, handleImageCropClose, handleImageCropValid } = this.props;
      const { cropContainerHeight } = this.state;
      return (
         <div className="image--crop--overlay" style={{ minHeight: cropContainerHeight }} >
            <div className="image--crop--container" ref={el => this.cropContainer = el} >
               <ReactCrop
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={onImageLoaded}
                  onComplete={onCropComplete}
                  onChange={onCropChange}
               />
               <div className="crop--buttons-menu" ref={el => this.cropButtons = el} >
                  <CustomSmallButton id="cancel" type="button" className="custom-small-button--positive--gray-blue-dark" onClick={handleImageCropClose} >Annuler</CustomSmallButton>
                  <CustomSmallButton id="crop" type="submit" className="custom-small-button--positive--duck-light" onClick={handleImageCropValid}>Couper</CustomSmallButton>
               </div>
            </div>
         </div>
      )
   }
};

export default ImageCropModalPopUp;