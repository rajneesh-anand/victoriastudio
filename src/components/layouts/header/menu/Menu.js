import React, { useState } from "react";
import { signOut, useSession, signIn, getCsrfToken } from "next-auth/client";
import MenuSidebar from "./MenuSidebar";
import { Button, Drawer, Modal, Form, Input, Popover } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Container from "../../../other/Container";
import Link from "next/link";

const HeaderMenu = ({ csrfToken }) => {
  const [session, loading] = useSession();
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState("mail");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const isValid = () => {
    if (email === "") {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = () => {
    if (isValid()) {
      signIn("email", { email: email });
    }
  };

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const content = (
    <>
      <div>
        <Link href="/user/dashboard">
          <a>Dashboard</a>
        </Link>
      </div>
      <div className="divider" />
      <div>
        <Link href="/user/newpost">
          <a>New Post</a>
        </Link>
      </div>
      <div className="divider" />
      <div>
        <Link href="/user/drafts">
          <a>My Drafts</a>
        </Link>
      </div>
      <Button type="primary" onClick={() => signOut()}>
        Sign Out
      </Button>
    </>
  );

  return (
    <>
      <div className="menu">
        <Container>
          <div className="menu-wrapper">
            <a
              href="/"
              className="menu-sidebar-opener"
              onClick={(e) => {
                e.preventDefault();
                setMenuSidebarOpen(true);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </a>
            <div className="menu-logo">
              <Link href="/">
                <a>
                  <img src="/assets/images/logo.png" alt="Logo" />
                </a>
              </Link>
            </div>
            <div className="menu-list">
              <div className="navbar">
                <Link href="/yoga">
                  <a>YOGA</a>
                </Link>
                <Link href="/sports">
                  <a>SPORTS</a>
                </Link>
                <div className="dropdown">
                  <button className="dropbtn">NEWS</button>
                  <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-functions">
              {!session ? (
                <Button onClick={showModal}>JOIN</Button>
              ) : (
                <>
                  <Popover
                    placement="bottom"
                    title="My Account"
                    content={content}
                    trigger="click"
                  >
                    <Button>
                      {!session.user.name ? (
                        <>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/logo.png"
                            }
                            style={{
                              width: "24px",
                              borderRadius: "50%",
                              marginRight: 5,
                            }}
                          />
                          <span>{session.user.email.split("@", 1)}</span>
                        </>
                      ) : (
                        <>
                          <img
                            src={session.user.image}
                            style={{
                              width: "24px",
                              borderRadius: "50%",
                              marginRight: 5,
                            }}
                          />
                          <span>{session.user.name}</span>
                        </>
                      )}
                    </Button>
                  </Popover>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Drawer
        placement="left"
        closable={true}
        title=" "
        onClose={() => setMenuSidebarOpen(false)}
        closeIcon={
          <>
            <CloseOutlined />
          </>
        }
        visible={menuSidebarOpen}
        width={350}
        className="menu-side"
      >
        <MenuSidebar />
      </Drawer>

      <Modal
        title="Login"
        footer={null}
        afterClose={handleCancel}
        onCancel={handleCancel}
        visible={visible}
        width={400}
        centered
        maskClosable={false}
      >
        <div className="login_wrapper">
          <div className="social-media">
            <a onClick={() => signIn("google")} className="gg">
              <span className="fab fa-google fa-lg" aria-hidden="true"></span>{" "}
              Login with Google
            </a>
            <a onClick={() => signIn("facebook")} className="fb">
              <span className="fab fa-facebook fa-lg" aria-hidden="true"></span>{" "}
              Login with Facebook
            </a>
          </div>
          <div className="divider" />
          <div className="login-form">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              id="login-form"
              layout="vertical"
              method="post"
              action="/api/auth/signin/email"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div>
                <Input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  placeholder="Enter your email !"
                  value={email}
                />
              </div>
              <a key="submit" onClick={handleSubmit} className="email">
                <span
                  className="fas fa-envelope fa-lg"
                  aria-hidden="true"
                ></span>{" "}
                Login with Email
              </a>
            </Form>
          </div>
          <p>
            By Login, you agree to neokriya's
            <a href="http://www.google.com"> Terms of Service </a> &amp;
            <a target="_blank" href="http://www.google.com">
              {" "}
              Privacy Policy
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
};

export async function getServerSideProps(req, res) {
  const csrfToken = await getCsrfToken({ req });
  return {
    props: {
      csrfToken: csrfToken,
    },
  };
}

export default React.memo(HeaderMenu);
