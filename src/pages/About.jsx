import React from "react";

function About() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <div
  className="flex flex-col justify-center items-center h-screen"
  style={{
    backgroundImage:
      "url(https://executiveboatandyacht.com/wp-content/uploads/2015/08/sail-boats-on-horizon.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
<h1 className="text-6xl font-bold mb-4 text-center text-green drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)]">
  Levelling Up the Ummah
</h1>
<p className="text-4xl text-center text-green drop-shadow-[2px_4px_6px_rgba(0,0,0,0.3)]">
  Democratising institutional tools to help you grow
</p>
</div>


      {/* Mission Statements Section */}
      <div className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 sm:px-12 lg:px-24">
          {/* Mission 1 */}
          <div className="text-center">
            <div className="rounded-full w-20 h-20 bg-green-500 mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="font-bold text-lg">Empower Financial Growth</h3>
            <p className="text-sm text-gray-600">
              Providing the tools and knowledge for Muslim investors to thrive.
            </p>
          </div>
          {/* Mission 2 */}
          <div className="text-center">
            <div className="rounded-full w-20 h-20 bg-green-500 mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="font-bold text-lg">Promote Ethical Investing</h3>
            <p className="text-sm text-gray-600">
              Championing Sharia-compliant solutions to create lasting impact.
            </p>
          </div>
          {/* Mission 3 */}
          <div className="text-center">
            <div className="rounded-full w-20 h-20 bg-green-500 mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="font-bold text-lg">Drive Innovation</h3>
            <p className="text-sm text-gray-600">
              Bringing institutional-grade tools to individual investors.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Bubbles */}
      <div className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          How We Achieve This
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-6 sm:px-12 lg:px-24">
          <div className="w-64 h-64 bg-white shadow-lg rounded-full flex flex-col items-center justify-center text-center p-6">
            <h4 className="font-bold text-lg text-green-600 mb-2">
              Cutting-Edge Tech
            </h4>
            <p className="text-sm text-gray-600">
              Building platforms that combine ethical principles with the latest
              advancements in finance.
            </p>
          </div>
          <div className="w-64 h-64 bg-white shadow-lg rounded-full flex flex-col items-center justify-center text-center p-6">
            <h4 className="font-bold text-lg text-green-600 mb-2">
              Tailored Education
            </h4>
            <p className="text-sm text-gray-600">
              Empowering users through actionable knowledge.
            </p>
          </div>
          <div className="w-64 h-64 bg-white shadow-lg rounded-full flex flex-col items-center justify-center text-center p-6">
            <h4 className="font-bold text-lg text-green-600 mb-2">
              Ethical Portfolios
            </h4>
            <p className="text-sm text-gray-600">
              Crafting portfolios that align with Sharia principles and your
              goals.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="flex flex-col lg:flex-row items-center lg:items-start px-6 sm:px-12 lg:px-24">
          {/* Text Section */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
            <p className="text-gray-600">
              Adam Ahmed is the visionary founder behind Safina Invest. With a
              mission to uplift the Muslim community through innovative,
              Sharia-compliant financial solutions, he has dedicated his career
              to bridging the gap between institutional-grade tools and
              individual investors.
            </p>
            <p className="text-gray-600 mt-4">
              Adam's expertise spans technology, finance, and community-driven
              growth. With experience from leading investment banks and asset managers his goal is to democratise finance for all while staying
              rooted in ethical and moral values.
            </p>
            <div className="flex justify-center mt-6">
  <a
    href="https://www.linkedin.com/in/adamahmed2210"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center px-4 py-2 bg-blue-700 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-800 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.657-1.343-3-3-3s-3 1.343-3 3v5.5h-3v-10h3v1.344c.891-1.161 2.222-1.844 3.5-1.844 2.481 0 4.5 2.019 4.5 4.5v6z" />
    </svg>
    Connect on LinkedIn
  </a>
</div>
          </div>
          
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/adam.png`}
              alt="Adam Ahmed"
              className="rounded-lg shadow-lg w-80 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
