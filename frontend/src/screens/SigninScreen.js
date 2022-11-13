import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';

const SigninScreen = {
  after_render: () => {
    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await signin({
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

        <form action="" id="signin-form">
            <h3>sign in</h3>
            <input type="email" name="" placeholder="enter your email" id="email" class="box">
            <input type="password" name="" placeholder="enter your password" id="password" class="box">
            <input type="submit" value="login now" class="btn">
            <p>don't have an account?</p>
            <a href="/#/register" class="btn link">register now</a>
        </form>

    </section>
    `;
  },
};

export default SigninScreen;
