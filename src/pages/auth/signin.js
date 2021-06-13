import React, { useState } from "react";
import { signIn, csrfToken, getCsrfToken } from "next-auth/client";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

export default function SignIn({ csrfToken }) {
  const [email, setEmail] = useState("");
  const isValid = () => {
    if (email === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    console.log(email);
    if (isValid()) {
      signIn("email", { email: email });
    }
  };

  return (
    <Layout>
      <SEO title="Victoria Studio | Login " />
      <div className="wrapper about-page-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="login-area">
            <div className="container">
              <div className="login-title">
                <p>SignIn Victoria Studio</p>
              </div>

              <div className="social-media">
                <div className="google">
                  <a
                    onClick={() =>
                      signIn("google", { callbackUrl: "http://localhost:3000" })
                    }
                  >
                    <span
                      className="fab fa-google fa-lg"
                      aria-hidden="true"
                    ></span>{" "}
                    Login with Google
                  </a>
                </div>
                <div className="facebook">
                  <a
                    onClick={() =>
                      signIn("facebook", {
                        callbackUrl: "http://localhost:3000",
                      })
                    }
                  >
                    <span
                      className="fab fa-facebook fa-lg"
                      aria-hidden="true"
                    ></span>{" "}
                    Login with Facebook
                  </a>
                </div>
              </div>

              <div className="center-item">
                <form method="post" action="/api/auth/signin/email">
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email !"
                      value={email}
                    />
                  </div>
                  <button type="submit" onClick={handleSubmit}>
                    Login
                  </button>
                </form>
              </div>

              <div className="terms">
                <p>
                  By Login, you agree to Victoria Studio
                  <a href="http://www.google.com"> Terms of Service </a>and
                  <a target="_blank" href="http://www.google.com">
                    {" "}
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
