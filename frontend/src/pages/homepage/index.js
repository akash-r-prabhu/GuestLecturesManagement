import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./style/mainbody.css";
import "./style/sidebar.css";
import "./style/activities.css";
import eye from "../../images/eye.svg";
import thought from "../../images/thought.jpg";
import guestGif from "../../images/guest.gif";
import python from "../../images/python.png";

function Homepage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    var datetime = new Date();
    setTime(datetime.toString());
  }, [time]);

  return (
    <>
      <Navbar />
      {/* Mainbody */}
      <div className="mainbody">
        <div className="sidebar" style={{ border: "none" }}>
          <div className="sidebar_first_col">
            <p
              style={{ textAlign: "center", fontSize: 18 }}
              className="lec_title"
            >
              Upcoming Lecture
            </p>
            <div
              className="profile_header"
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            />
            <img
              src={python}
              alt="noimage"
              style={{
                height: 80,
                width: 80,
                borderRadius: "50%",
                border: "4px solid white",
                margin: "-35px auto 0 auto",
              }}
            />
            <div className="profile_info">
              <p style={{ textAlign: "center" }} className="lec_title">
                Python Libraries
              </p>
              <p>Starts At:{time}</p>
              <p className="account_name">
                In the Python libraries lecture, we can learn about the vast
                ecosystem of libraries available to Python developers and how
                they can significantly enhance our programming capabilities
              </p>
            </div>
            <div style={{ border: "0.2px solid lightgrey" }} />
            <div className="connections">
              <br />
              <div className="view">
                <div className="viewleft">
                  <img src={eye} alt="views" />
                  <p>
                    rgestration <b>200</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          <div className="post_item">
            <img src={thought} alt="" style={{ width: "100%" }} />
          </div>
          <div className="post_item">
            <div className="post_item_header">
              <div className="post_item_info">
                <div
                  className="post_item_owner"
                  style={{ marginLeft: 8, padding: "0%" }}
                >
                  <p>
                    "Celebrating a constellation of brilliant minds who inspire,
                    educate, and transform. Join us as we unlock a universe of
                    knowledge with our esteemed guest lecturers."
                  </p>
                  <p
                    style={{
                      fontSize: 40,
                      fontWeight: "bold20px",
                      padding: "0%",
                    }}
                  >
                    our guest lecturers
                  </p>
                </div>
              </div>
              <i className="bi bi-three-dots" style={{ padding: 5 }} />
            </div>
            <div className="post_item_body_info">
              <p style={{ fontSize: "0.95rem" }}></p>
            </div>
            <img
              src={guestGif}
              alt="noom"
              className="post_item_body_video"
              style={{ width: "100%" }}
            />
            <div className="post_item_footer">
              <div className="footer_item">
                <i className="bi bi-hand-thumbs-up" /> <div>Like</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-arrow-90deg-right" /> <div>Share</div>
              </div>
            </div>
          </div>
        </div>
        <div className="activity">
          <div className="news">
            <div className="news_head">
              <div className="news_title">
                <b>Announcements</b>
              </div>
            </div>
            <br />
            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: 14,
                    marginRight: 10,
                    display: "block",
                    marginTop: 5,
                  }}
                />
                📢 Exciting Update: Guest Lecture System Revamped! New features
                include seamless registration, interactive Q&amp;A sessions, and
                enhanced speaker profiles. Join us for an enhanced lecture
                experience!
              </div>
            </div>
          </div>
          <div className="news">
            <div className="news_head">
              <div className="news_title">
                <b>Important date</b>
              </div>
            </div>
            <br />
            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: 14,
                    marginRight: 10,
                    display: "block",
                    marginTop: 5,
                  }}
                />
                Registered for Entrepreneurship: A lifetime of rewards, on 5th
                Dec
              </div>
            </div>
            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: 14,
                    marginRight: 10,
                    display: "block",
                    marginTop: 5,
                  }}
                />
                Registered for Digital Disruption and its Impact, exam on 2nd
                Dec
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
