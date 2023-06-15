import React from "react";
import { Navbar } from "../../components";

function ContactPage() {
  return (
    <>
      <Navbar />
      <title>About Us</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    body {\n      font-family: Arial, sans-serif;\n      margin: 0;\n      padding: 0;\n      background-color: #f5f5f5;\n    }\n    .container {\n      width: 800px;\n      margin: 0 auto;\n      padding: 20px;\n      background-color: #fff;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    }\n    h1 {\n      color: #333;\n      margin-bottom: 20px;\n    }\n    p {\n      line-height: 1.5;\n      margin-bottom: 10px;\n    }\n    .feedback-form {\n      margin-top: 30px;\n    }\n    .feedback-form h2 {\n      color: #333;\n      margin-bottom: 10px;\n    }\n    .feedback-form label {\n      display: block;\n      margin-bottom: 10px;\n      font-weight: bold;\n      color: #555;\n    }\n    .feedback-form textarea {\n      width: 100%;\n      height: 100px;\n      resize: vertical;\n    }\n    .feedback-form input[type="text"],\n    .feedback-form input[type="email"],\n    .feedback-form textarea {\n      padding: 10px;\n      border: none;\n      border-radius: 6px;\n      font-size: 14px;\n      background-color: #f5f5f5;\n      transition: all 0.3s ease;\n    }\n    .feedback-form input[type="text"]:focus,\n    .feedback-form input[type="email"]:focus,\n    .feedback-form textarea:focus {\n      outline: none;\n      background-color: #fff;\n      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);\n    }\n    .feedback-form input[type="submit"] {\n      padding: 10px 20px;\n      background-color: #333;\n      color: #fff;\n      border: none;\n      border-radius: 6px;\n      cursor: pointer;\n    }\n    .feedback-form input[type="submit"]:hover {\n      background-color: #555;\n    }\n    .feedback-container {\n      display: flex;\n      border: 1px solid #ccc;\n      padding: 20px;\n      margin-top: 20px;\n      background-color: #fff;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n      border-radius: 10px;\n      transition: all 0.3s ease;\n    }\n    .feedback-container img {\n      width: 80px;\n      height: 80px;\n      margin-right: 20px;\n      border-radius: 50%;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    }\n    .feedback-container p {\n      margin-bottom: 10px;\n      color: #333;\n    }\n    .row {\n      display: flex;\n      margin-top: 20px;\n    }\n    .row .feedback-container {\n      flex: 1;\n      margin-right: 20px;\n      background-color: #f5f5f5;\n      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n    }\n    .feedback-container:hover {\n      transform: translate(0, -5px);\n      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);\n    }\n  ',
        }}
      />
      <div className="container">
        <h1>About Us</h1>
        <p>Welcome to our Guest Lecture Management System!</p>
        <p>
          We are a team of dedicated professionals who have developed this
          system to simplify the management of guest lectures in educational
          institutions. Our goal is to provide an efficient and user-friendly
          platform for scheduling, organizing, and evaluating guest lectures.
        </p>
        <p>
          With our system, you can easily manage guest lecture requests, invite
          speakers, schedule lectures, track attendance, and gather feedback
          from participants.
        </p>
        <p>
          We are committed to continuously improving our system and providing
          excellent support to our users. Your feedback is valuable to us as it
          helps us enhance the system and cater to your needs more effectively.
        </p>
        <p>Thank you for choosing our Guest Lecture Management System!</p>
        <div className="feedback-form">
          <h2>Feedback</h2>
          <div className="row">
            <div className="feedback-container">
              {/* <img src="1.jpg" alt="Student 1" /> */}
              <div>
                <p>
                  <strong>Anjali:</strong>
                </p>
                <p>
                  The guest lecture management system is fantastic! It has made
                  it incredibly easy for us to request lectures and keep track
                  of our attendance. The interface is user-friendly, and the
                  system is very reliable. Thank you for developing such a
                  useful tool!
                </p>
              </div>
            </div>
            <div className="feedback-container">
              {/* <img src="2.jpg" alt="Student 2" /> */}
              <div>
                <p>
                  <strong>Ammu:</strong>
                </p>
                <p>
                  This guest lecture management system is a game-changer! It has
                  streamlined the entire process, from scheduling lectures to
                  receiving certificates. The system is intuitive and efficient.
                  We greatly appreciate the efforts put into developing this
                  platform!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="feedback-container">
              {/* <img src="3.jpg" alt="Teacher 1" /> */}
              <div>
                <p>
                  <strong>Sraya:</strong>
                </p>
                <p>
                  The guest lecture management system has been a valuable
                  addition to our institution. It has simplified the process of
                  organizing and managing guest lectures. The system is
                  reliable, and the support provided by the team is commendable.
                  Keep up the good work!
                </p>
              </div>
            </div>
            <div className="feedback-container">
              {/* <img src="4.jpg" alt="Teacher 2" /> */}
              <div>
                <p>
                  <strong>Suresh:</strong>
                </p>
                <p>
                  We are extremely pleased with the guest lecture management
                  system. It has made our job so much easier. The system's
                  features are comprehensive, and the user interface is
                  intuitive. We highly recommend this platform to other
                  educational institutions.
                </p>
              </div>
            </div>
          </div>
          <h2>Leave Your Feedback</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required="" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required="" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" required="" defaultValue={""} />
            <input type="submit" defaultValue="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
