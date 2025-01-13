import {FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import FAQ from "../components/FAQ";


function Faqs() {
  const [faqs, setFaqs] = useState([
    {
      question: "Is Yogvan Holidays 1BHK Apartments Tapovan Rishikesh popular with families?",
      answer: "Yes, Yogvan Holidays 1BHK Apartments Tapovan Rishikesh is popular with guests booking family stays.",
      open: true,
    },
    {
      question: "How much does it cost to stay at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh?",
      answer: "The prices at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh may vary depending on your stay (e.g. dates, hotel's policy etc.). To see prices, enter your dates.",
      open: false,
    },
    {
      question: "How many bedrooms does Yogvan Holidays 1BHK Apartments Tapovan Rishikesh have?",
      answer: "Yogvan Holidays 1BHK Apartments Tapovan Rishikesh has the following number of bedrooms: 1 bedroom. For more detailed info, check the accommodation option(s) breakdown on this page.",
      open: false,
    },
    {
      question: "Does Yogvan Holidays 1BHK Apartments Tapovan Rishikesh have a terrace?",
      answer: "Yes, there are options at this property that have a terrace. You can find out more about this and the other facilities at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh on this page.",
      open: false,
    },
    {
      question: "Does Yogvan Holidays 1BHK Apartments Tapovan Rishikesh have a balcony?",
      answer: "Yes, there are options at this property that have a balcony. You can find out more about this and the other facilities at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh on this page.",
      open: false,
    },
    {
      question: "How many guests can sleep at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh?",
      answer: "You can choose from a number of accommodation options at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh (subject to availability) that can accommodate: 2 guests, 4 guests. For more detailed info, check the accommodation option(s) breakdown on this page.",
      open: false,
    },
    {
      question: "How far is Yogvan Holidays 1BHK Apartments Tapovan Rishikesh from the center of Rishīkesh?",
      answer: "The exact distance from Yogvan Holidays 1BHK Apartments Tapovan Rishikesh to the center of Rishīkesh is not mentioned, but you can find detailed location information on this page.",
      open: false,
    },
    {
      question: "What is there to do at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh?",
      answer: "Yogvan Holidays 1BHK Apartments Tapovan Rishikesh offers the following activities/services (charges may apply): Hiking, Bicycle rental, Water sports facilities on site.",
      open: false,
    },
    {
      question: "What are the check-in and check-out times at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh?",
      answer: "Check-in at Yogvan Holidays 1BHK Apartments Tapovan Rishikesh is from 2:00 PM, and check-out is until 10:30 AM.",
      open: false,
    },

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
