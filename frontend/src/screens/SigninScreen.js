const SigninScreen = {
  after_render: () => {},
  render: () => {
    return `
    <section class="login">

        <form action="">
            <h3>sign in</h3>
            <input type="email" name="" placeholder="enter your email" id="" class="box">
            <input type="password" name="" placeholder="enter your password" id="" class="box">
            <input type="submit" value="login now" class="btn">
            <p>don't have an account?</p>
            <a href="/#/register" class="btn link">register now</a>
        </form>

    </section>
    `;
  },
};

export default SigninScreen;
