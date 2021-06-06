import { Select, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import Container from "../../../other/Container";

function TopNav({ containerType }) {
  return (
    <div className="top-nav">
      <Container type={containerType}>
        <div className="top-nav-wrapper">
          <div className="top-nav-links">
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/storelocator"}>
                <a>
                  <i className="icon_pin_alt" />
                  Store Location
                </a>
              </Link>
            </div>
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/help"}>
                <a>
                  <i className="icon_question_alt2" />
                  Help
                </a>
              </Link>
            </div>
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/offer"}>
                <a>
                  <i className="icon_gift" /> Offer
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default React.memo(TopNav);
