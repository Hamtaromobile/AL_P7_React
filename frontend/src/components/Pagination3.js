import React, { useState } from 'react';

const Pagination3 = ({ totalPages, pageLimit }) => {
  // Définir l'état local pour la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Définir l'état local pour les pages à afficher
  const [pagesToShow, setPagesToShow] = useState([]);

  // Effectuer une mise à jour de la page actuelle lorsque le bouton est cliqué
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Mettre à jour le tableau des pages à afficher en fonction de la page actuelle
  React.useEffect(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPagesToShow(pages.slice(currentPage - 1, currentPage + pageLimit - 1));
  }, [currentPage, totalPages, pageLimit]);

  return (
    <>
      {/* Bouton pour aller à la page précédente */}
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Précédent
        </button>
      )}

      {/* Afficher les pages */}
      {pagesToShow.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}

      {/* Bouton pour aller à la page suivante */}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Suivant
        </button>
      )}
    </>
  );
};

export default Pagination3;