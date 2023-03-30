const ItemsBar = ({ setSelectMenu }) => {
  const handleSelectMenu = (e, type) => {
    setSelectMenu({
      menuType: type,
      typeValue: e.target.value
    });
  }
  return (
    <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
            Items
        </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="accordion-body">
              <ul className="list-group list-group-flush">
                  <li className="list-group-item side-menu-item" value='' onClick={(e) => handleSelectMenu(e, 'items')}><i className="bi bi-bricks"></i> All Items</li>
                  <li className="list-group-item side-menu-item" value='' onClick={(e) => handleSelectMenu(e, 'favorite')}><i className="bi bi-star"></i> Favorites</li>
                  <li className="list-group-item side-menu-item" value='1' onClick={(e) => handleSelectMenu(e, 'type')}><i className="bi bi-globe"></i> Login</li>
                  <li className="list-group-item side-menu-item" value='2' onClick={(e) => handleSelectMenu(e, 'type')}><i className="bi bi-credit-card-2-back"></i> Card</li>
                  <li className="list-group-item side-menu-item" value='3' onClick={(e) => handleSelectMenu(e, 'type')}><i className="bi bi-person-vcard"></i> Identity</li>
                  <li className="list-group-item side-menu-item" value='4' onClick={(e) => handleSelectMenu(e, 'type')}><i className="bi bi-sticky"></i> Secure note</li>
              </ul>
          </div>
        </div>
    </div>
  )
}
export default ItemsBar;

