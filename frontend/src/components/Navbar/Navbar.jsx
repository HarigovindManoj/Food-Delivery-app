import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({showFoodSearch, setShowFoodSearch, setShowLogin }) => {
  const {
    handleSearch,
    searchTerm,
    setSearchTerm,
    getTotalCartAmount,
    token,
    setToken
  } = useContext(StoreContext);

  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    await handleSearch(e);
    setShowFoodSearch(true);
  };

  return (
    <div className='navbar'>
      <ul className='navbar-menu'>
        <Link onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </ul>
      <Link onClick={()=>setShowFoodSearch(false)} to='/'><img className='logo' src={assets.logo} alt='logo'/></Link>
      <div className='navbar-right'>
        {showFoodSearch?<></>:
          <form onSubmit={handleSearchClick}>
          <div className='search-bar'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search for food...'
            />
            <button className='search-btn' type='submit'>
              <img src={assets.search_icon} alt='' />
            </button>
          </div>
        </form>
        }

        
        <div className='navbar-search_icon'>
          <Link to='/cart'><img className='cart-img' src={assets.basket_icon} alt='' /></Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button className='sign-btn' onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
