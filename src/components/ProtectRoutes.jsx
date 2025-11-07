import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProtectRoutes() {
  const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      const dialog = document.getElementById("dialog");
      if (dialog) {
        dialog.showModal();
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
    
    </>
  )
}
