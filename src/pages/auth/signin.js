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
    e.preventDefault();

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
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-6">
                <div className="signBlock">
                  <div className="commonStyle">
                    <p>SignIn Victoria Studio</p>
                  </div>

                  <div className="commonStyle">
                    <button
                      className="google"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "https://vic.vercel.app/",
                        })
                      }
                    >
                      <span
                        className="fab fa-google fa-lg"
                        aria-hidden="true"
                      ></span>{" "}
                      Login with Google
                    </button>
                  </div>

                  <div className="commonStyle">
                    <button
                      className="facebook"
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: "https://vic.vercel.app/",
                        })
                      }
                    >
                      <span
                        className="fab fa-facebook fa-lg"
                        aria-hidden="true"
                      ></span>{" "}
                      Login with Facebook
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <input
                      name="csrfToken"
                      type="hidden"
                      defaultValue={csrfToken}
                    />
                    <div className="commonStyle">
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email !"
                        value={email}
                      />
                    </div>
                    <div className="commonStyle">
                      <button className="email" type="submit">
                        Login With Email
                      </button>
                    </div>
                  </form>
                  <div>
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
