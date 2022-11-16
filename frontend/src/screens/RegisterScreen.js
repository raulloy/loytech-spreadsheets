import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await register({
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
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
    <section class="login">

        <form action="" id="register-form">
            <h3>register now</h3>
            <input type="text" placeholder="enter your name" id="name" class="box">
            <input type="email" placeholder="enter your email" id="email" class="box">
            <input type="password" placeholder="enter your password" id="password" class="box">
            <input type="password" placeholder="re-enter your password" id="" class="box">
            <input type="submit" value="register now" class="btn">
            <p>Already have an account?</p>
            <a href="/#/signin" class="btn link">signin now</a>
        </form>

    </section>
    `;
  },
};

export default RegisterScreen;
