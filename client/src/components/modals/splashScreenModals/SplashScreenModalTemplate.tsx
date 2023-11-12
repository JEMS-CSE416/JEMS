import React, { ReactNode } from "react";
import "./css/SplashScreenModalTemplate.css";

interface SplashScreenModalTemplateProps {
  children: ReactNode;
  onCloseLoginModal?: () => void;
  onClosePasswordRecoveryModal?: () => void;
  onCloseSignupModal?: () => void;
}

const SplashScreenModalTemplate: React.FC<SplashScreenModalTemplateProps> = ({
  children,
  onCloseLoginModal,
  onClosePasswordRecoveryModal,
  onCloseSignupModal,
}) => {
  // closes modal when outside of modal is clicked
  function closeModal() {
    if (onCloseLoginModal) {
      onCloseLoginModal();
    } else if (onClosePasswordRecoveryModal) {
      onClosePasswordRecoveryModal();
    } else if (onCloseSignupModal) {
      onCloseSignupModal();
    }
  }
  return (
    <>
      <div
        className="modal-overlay"
        onClick={() => {
          closeModal();
        }}
      >
        <div
          id="one"
          className="modal-box"
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
export default SplashScreenModalTemplate;
