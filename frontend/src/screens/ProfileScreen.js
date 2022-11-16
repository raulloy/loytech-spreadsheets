import { update } from '../api';
import { clearUser, getUserInfo, setUserInfo } from '../localStorage';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        if (data.error) {
          alert(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    <section class="login">

      <form action="" id="profile-form">
          <h3>user profile</h3>
          <input type="text" placeholder="enter your name" id="name" class="box" value="${name}">
          <input type="email" placeholder="enter your email" id="email" class="box" value="${email}">
          <input type="password" placeholder="enter your password" id="password" class="box">
          <input type="submit" value="update" class="btn">

          <a id="signout-button" class="btn link">sign out</a>
      </form>

    </section>
    `;
  },
};

export default ProfileScreen;
