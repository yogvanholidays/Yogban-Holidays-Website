import {FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import FAQ from "../components/FAQ";


function Faqs() {
  const [faqs, setFaqs] = useState([
    {
      question: "How many programmers does it take to screw a lightbulb?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      open: true
    },
    {
      question: "Who is the most awesome person?",
      answer: "You! The viewer!",
      open: false
    },
    {
      question:
        "How many questions does it take to makes a succesful FAQ Page?",
      answer: "This many!",
      open: false
    }
  ]);

  const toggleFAQ = (index:number) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };


  return (
    <div className="container mx-auto px-8 py-12">
                <Link to='/' className=" text-gray-500">Back</Link>

      <h1 className="text-5xl font-bold mb-10">Frequently Asked Questions</h1>

      <div className="faqs">
        {faqs.map((faq, index) => (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-xl mb-6">For any inquiries or assistance, please email us at <a href="mailto:yogvanholidays@gmail.com" className="text-blue-500"><FaExternalLinkAlt className="mr-2" />yogvanholidays@gmail.com</a>.</p>
      </section>
    </div>
  );
}

export default Faqs;
